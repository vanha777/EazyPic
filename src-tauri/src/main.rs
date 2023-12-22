#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
pub mod models;
extern crate dotenv;
use dotenv::dotenv;
use std::env;

#[tokio::main]
pub async fn main() {
    dotenv().ok();
    // Change demo_mobile_app to the name of your app!
    app::AppBuilder::new().run();
}
