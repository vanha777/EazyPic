use std::error::Error;

use models::image::{ImageJobReply, ImageResponse, MediaRequest, MediaResponse};
use tauri::App;
#[cfg(mobile)]
mod mobile;
#[cfg(mobile)]
pub use mobile::*;
pub type SetupHook = Box<dyn FnOnce(&mut App) -> Result<(), Box<dyn std::error::Error>> + Send>;
pub mod models;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

#[tauri::command]
async fn background_generate(input: &str) -> Result<ImageJobReply, String> {
    let client = reqwest::Client::new();
    let response = client
        .post("http://localhost:1010/image")
        .json(&serde_json::json!({
            "input":input
        }))
        .send()
        .await
        .map_err(|e| e.to_string())?;
    let image_response = response
        .json::<ImageResponse>()
        .await
        .map_err(|e| e.to_string())?;

    let result = ImageJobReply {
        status: Some("Successfull".to_string()),
        file_name: None,
        link: image_response.data.get(0).and_then(|x| x.b64_json.clone()),
    };

    Ok(result)
}

#[tauri::command]
async fn upload_file(file_bytes: Vec<u8>, token: &str) -> Result<ImageJobReply, String> {
    let client = reqwest::Client::new();
    let presigned_link = client
        .get("http://localhost:1010/get-upload-link")
        .header("Authorization", format!("Bearer {}", token))
        .send()
        .await
        .map_err(|e| e.to_string())?
        .json::<MediaResponse>()
        .await
        .map_err(|e| e.to_string())?;

    // upload fifle to aws
    match client.put(presigned_link.url).body(file_bytes).send().await {
        Ok(_) => Ok(client
            .post("http://localhost:1010/get-download-link")
            .json(&MediaRequest {
                data: None,
                id: presigned_link.item,
            })
            .header("Authorization", format!("Bearer {}", token))
            .send()
            .await
            .map_err(|e| e.to_string())?
            .json::<ImageJobReply>()
            .await
            .map_err(|e| e.to_string())?),

        Err(e) => Err(format!("AWS Error {:?}", e.to_string())),
    }
}

#[tauri::command]
async fn get_character(file_name: &str) -> Result<ImageJobReply, String> {
    let client = reqwest::Client::new();
    let response = client
        .post("http://localhost:1010/make-character")
        .json(&MediaRequest {
            data: None,
            id: file_name.to_string(),
        })
        .send()
        .await
        .map_err(|e| e.to_string())?;
    let res = response
        .json::<ImageJobReply>()
        .await
        .map_err(|e| e.to_string())?;

    Ok(res)
}

#[derive(Default)]
pub struct AppBuilder {
    setup: Option<SetupHook>,
}
impl AppBuilder {
    pub fn new() -> Self {
        Self::default()
    }
    #[must_use]
    pub fn setup<F>(mut self, setup: F) -> Self
    where
        F: FnOnce(&mut App) -> Result<(), Box<dyn std::error::Error>> + Send + 'static,
    {
        self.setup.replace(Box::new(setup));
        self
    }
    pub fn run(self) {
        let setup = self.setup;
        tauri::Builder::default()
            .setup(move |app| {
                if let Some(setup) = setup {
                    (setup)(app)?;
                }
                Ok(())
            })
            .invoke_handler(tauri::generate_handler![
                greet,
                background_generate,
                upload_file,
                get_character
            ])
            .run(tauri::generate_context!())
            .expect("error while running tauri application");
    }
}
#[cfg(mobile)]
fn do_something() {
    println!("Hello from Mobile!");
}
#[cfg(desktop)]
fn do_something() {
    println!("Hello from Desktop!");
}
fn run() {
    if cfg!(mobile) {
        println!("Hello from Mobile!");
    } else {
        println!("Hello from Desktop!");
    }
}
