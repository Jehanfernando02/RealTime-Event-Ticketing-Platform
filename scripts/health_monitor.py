#!/usr/bin/env python3
import urllib.request
import urllib.error
import time
import json
import logging
from datetime import datetime

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s',
    handlers=[
        logging.StreamHandler()
    ]
)

HEALTH_ENDPOINT = "http://localhost:8080/actuator/health"
CHECK_INTERVAL_SECONDS = 30

def check_health():
    try:
        start_time = time.time()
        req = urllib.request.Request(HEALTH_ENDPOINT)
        with urllib.request.urlopen(req, timeout=5) as response:
            status_code = response.getcode()
            response_time = round((time.time() - start_time) * 1000, 2)
            
            if status_code == 200:
                body = response.read().decode('utf-8')
                try:
                    data = json.loads(body)
                    status = data.get('status', 'UNKNOWN')
                    logging.info(f"System Health: {status} | Response Time: {response_time}ms | Code: {status_code}")
                    return True
                except json.JSONDecodeError:
                    logging.warning(f"Endpoint returned 200 but response is not JSON. Code: {status_code}")
                    return False
            else:
                logging.error(f"Health check failed! Status Code: {status_code} | Response Time: {response_time}ms")
                return False
                
    except urllib.error.URLError as e:
        logging.error(f"Failed to connect to {HEALTH_ENDPOINT}. Error: {e.reason}")
        return False
    except Exception as e:
        logging.error(f"An unexpected error occurred: {str(e)}")
        return False

def main():
    logging.info(f"Starting System Health Monitor. Polling {HEALTH_ENDPOINT} every {CHECK_INTERVAL_SECONDS} seconds.")
    logging.info("Press Ctrl+C to stop.")
    
    try:
        while True:
            is_healthy = check_health()
            if not is_healthy:
                logging.critical("ALERT: The backend system appears to be down or unreachable!")
                # In a real environment, you would trigger a PagerDuty or Slack alert here
                
            time.sleep(CHECK_INTERVAL_SECONDS)
    except KeyboardInterrupt:
        logging.info("Health monitor stopped by user.")

if __name__ == "__main__":
    main()
