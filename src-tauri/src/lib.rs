use models::image::ImageResponse;
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
async fn background_generate() -> Result<String, String> {
    match reqwest::Client::new()
        .post("http://localhost:1010/image")
        .json(&serde_json::json!(
            {
                "input":"Create a background image that encompasses elements of space and sky, featuring astronomical phenomena. This backdrop will later be used to insert a main robot character into the scene."
            }
    ))
        .send()
        .await
    {
        Ok(x) => {
            let url = x.json::<ImageResponse>().await.unwrap();
            Ok(url.data.get(0).map(|x| x.b64_json.clone().unwrap_or_default()).unwrap_or_default())
        }
        Err(e) => Err(e.to_string()),
    }
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
            .invoke_handler(tauri::generate_handler![greet, background_generate])
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
