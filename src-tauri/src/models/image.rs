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
