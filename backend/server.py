# server.py
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated
from functools import lru_cache
import openai

import config

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@lru_cache
def get_settings():
    return config.Settings()


@app.get("/prompt")
async def prompt(settings: Annotated[config.Settings, Depends(get_settings)], prompt: str):
    """Get the model response from user's prompt.
    
    Args:
        prompt (str): The request of user's prompt.
    
    Returns:
        dict: A dictionary containing the model name and the content of the response message.
        - model (str): The name of the model, e.g., "gpt-3.5-turbo".
        - message (str): The contents of the response message.
    """
    openai.api_key = settings.API_KEY

    try:
        response = openai.ChatCompletion.create(
            model=settings.MODEL,
            messages=[
                {"role": "system", "content": "Response in Korean"},
                {"role": "user", "content": prompt}, 
            ],
            temperature=0,
        )

        return {
            "model": settings.MODEL,
            "message": response.choices[0]['message']['content']
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error occurred while processing: {str(e)}")
