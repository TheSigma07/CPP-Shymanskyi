FROM nginx:alpine

# Інструкція LABEL з ім'ям автора та версією образу (вимога методички)
LABEL maintainer="Andrii Shymanskyi <student@test.com>"
LABEL version="1.0"

# Копіюємо вміст проєкту у стандартну директорію nginx
COPY . /usr/share/nginx/html

# Відкриваємо 80 порт
EXPOSE 80