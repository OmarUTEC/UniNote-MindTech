from google_auth_oauthlib.flow import Flow
import pathlib
import os
from config import Config

def get_google_oauth_flow():
    client_secrets_file = os.path.join(pathlib.Path(__file__).parent, "client_secret.json")
    flow = Flow.from_client_secrets_file(
        client_secrets_file=client_secrets_file,
        scopes=["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email", "openid"],
        redirect_uri="http://127.0.0.1:5000/callback"
    )
    return flow
