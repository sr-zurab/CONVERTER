with open("db.json", "r", encoding="windows-1251") as f:
    content = f.read()

with open("db_utf8.json", "w", encoding="utf-8") as f:
    f.write(content)
