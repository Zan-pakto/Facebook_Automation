const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const FB_GRAPH_VERSION = 'v20.0';
const BASE_URL = `https://graph.facebook.com/${FB_GRAPH_VERSION}`;

/**
 * Exchange Authorization Code for Short-Lived Access Token
 */
const exchangeCodeForToken = async (code) => {
  const appId = process.env.FB_APP_ID;
  const appSecret = process.env.FB_APP_SECRET;
  const redirectUri = process.env.FB_REDIRECT_URI;

  try {
    const response = await axios.get(`${BASE_URL}/oauth/access_token`, {
      params: {
        client_id: appId,
        redirect_uri: redirectUri,
        client_secret: appSecret,
        code: code,
      },
    });
    return response.data.access_token;
  } catch (error) {
    const errorMsg = error.response?.data?.error?.message || error.message;
    console.error('Error exchanging code for token:', errorMsg);
    throw new Error(`Facebook OAuth Code Exchange Failed: ${errorMsg}`);
  }
};

/**
 * Exchange Short-Lived Token for Long-Lived Access Token (~60 days)
 */
const exchangeShortToLongLivedToken = async (shortToken) => {
  const appId = process.env.FB_APP_ID;
  const appSecret = process.env.FB_APP_SECRET;

  try {
    const response = await axios.get(`${BASE_URL}/oauth/access_token`, {
      params: {
        grant_type: 'fb_exchange_token',
        client_id: appId,
        client_secret: appSecret,
        fb_exchange_token: shortToken,
      },
    });
    return response.data.access_token;
  } catch (error) {
    const errorMsg = error.response?.data?.error?.message || error.message;
    console.error('Error exchanging short to long token:', errorMsg);
    throw new Error(`Facebook OAuth Long-Lived Token Exchange Failed: ${errorMsg}`);
  }
};

/**
 * Get User Facebook Profile Info (id, name, email)
 */
const getUserProfile = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/me`, {
      params: {
        fields: 'id,name,email',
        access_token: accessToken,
      },
    });
    return response.data;
  } catch (error) {
    const errorMsg = error.response?.data?.error?.message || error.message;
    console.error('Error getting user profile:', errorMsg);
    throw new Error(`Facebook Fetch User Profile Failed: ${errorMsg}`);
  }
};

/**
 * Get Facebook Pages Managed by User
 */
const getUserPages = async (userAccessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/me/accounts`, {
      params: {
        fields: 'id,name,access_token,category,picture{url}',
        access_token: userAccessToken,
        limit: 100, // Fetch up to 100 pages at once
      },
    });
    return response.data.data;
  } catch (error) {
    const errorMsg = error.response?.data?.error?.message || error.message;
    console.error('Error fetching user accounts/pages:', errorMsg);
    throw new Error(`Facebook Fetch Pages Failed: ${errorMsg}`);
  }
};

/**
 * Publish Text Post to Page Feed
 */
const publishTextPost = async (pageId, pageAccessToken, message) => {
  try {
    const response = await axios.post(`${BASE_URL}/${pageId}/feed`, {
      message: message,
      access_token: pageAccessToken,
    });
    return response.data.id;
  } catch (error) {
    const errorMsg = error.response?.data?.error?.message || error.message;
    throw new Error(errorMsg);
  }
};

/**
 * Publish Photo/Image to Page
 */
const publishImagePost = async (pageId, pageAccessToken, caption, filePath) => {
  try {
    const form = new FormData();
    form.append('access_token', pageAccessToken);
    form.append('caption', caption || '');
    form.append('source', fs.createReadStream(filePath));

    const response = await axios.post(`${BASE_URL}/${pageId}/photos`, form, {
      headers: form.getHeaders(),
    });
    return response.data.id;
  } catch (error) {
    const errorMsg = error.response?.data?.error?.message || error.message;
    throw new Error(errorMsg);
  }
};

/**
 * Publish Video to Page
 */
const publishVideoPost = async (pageId, pageAccessToken, description, filePath) => {
  try {
    const form = new FormData();
    form.append('access_token', pageAccessToken);
    form.append('description', description || '');
    form.append('source', fs.createReadStream(filePath));

    const response = await axios.post(`${BASE_URL}/${pageId}/videos`, form, {
      headers: form.getHeaders(),
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });
    return response.data.id;
  } catch (error) {
    const errorMsg = error.response?.data?.error?.message || error.message;
    throw new Error(errorMsg);
  }
};

module.exports = {
  exchangeCodeForToken,
  exchangeShortToLongLivedToken,
  getUserProfile,
  getUserPages,
  publishTextPost,
  publishImagePost,
  publishVideoPost,
};
