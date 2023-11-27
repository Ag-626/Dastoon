let lastRequestTime = 0;
const RATE_LIMIT_DELAY = 1000; // 1 second

async function query(data) {
    const currentTime = Date.now();
    const timeSinceLastRequest = currentTime - lastRequestTime;

    if (timeSinceLastRequest < RATE_LIMIT_DELAY) {
        const delay = RATE_LIMIT_DELAY - timeSinceLastRequest;
        await new Promise(resolve => setTimeout(resolve, delay));
    }

    const headers = {
        "Accept": "image/png",
        "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
        "Content-Type": "application/json"
    };

    const response = await fetch(
        "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
        {
            headers,
            method: "POST",
            body: JSON.stringify(data),
        }
    );

    lastRequestTime = Date.now();

    const result = await response.blob();
    return result;
}

export default query;
