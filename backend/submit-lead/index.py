import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    """Сохранение заявки с лендинга цветных кладочных смесей Perel"""
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    raw_body = event.get("body") or "{}"
    if isinstance(raw_body, str):
        body = json.loads(raw_body)
    else:
        body = raw_body

    name = (body.get("name") or "").strip()
    phone = (body.get("phone") or "").strip()
    message = (body.get("message") or "").strip()

    if not name or not phone:
        return {
            "statusCode": 400,
            "headers": cors_headers,
            "body": {"error": "Имя и телефон обязательны"},
        }

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO t_p14448152_data_analytics_initi.leads (name, phone, message) VALUES (%s, %s, %s) RETURNING id",
        (name, phone, message),
    )
    lead_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": {"ok": True, "id": lead_id},
    }