use serde::{Deserialize, Serialize};

#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct ImageResponse {
    pub created: Option<i32>,
    pub data: Vec<Url>,
}

#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct Url {
    pub url: Option<String>,
    pub b64_json: Option<String>,
    pub revised_prompt: Option<String>,
}

#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct MediaResponse {
    pub item: String,
    pub url: String,
    pub expires: String,
    pub created_at: String,
}

#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct MediaRequest {
    pub data: Option<String>,
    pub id: String,
}

#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct ImageJobReply {
    pub status: Option<String>,
    pub file_name: Option<String>,
    pub link: Option<String>,
}
