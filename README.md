# whim.li

Simple url shortener.

---

* NextJS
* Vercel storage
* AuthJS
* Prisma
* ShadcnUI
* Tailwind
* docker

---
Local database

```bash
docker run -d -e POSTGRES_DB=<mydb> -e POSTGRES_PASSWORD=<mypassword> -e POSTGRES_USER=default -p "6500:5432" --name whim-postgres postgres
```