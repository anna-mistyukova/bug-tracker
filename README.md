## Bug Tracker

### Репозиторий

`git clone https://github.com/anna-mistyukova/bug-tracker.git`

Для клонирования репозитория

`cd bug-tarcker`

Переход в каталог проетка

### Установка модулей
`npm install`

### Настройка окружения
В корне проекта необходимо создать файл `.env.local` с ключами подключения к Firebase. Пример файла приведен ниже.
```
REACT_APP_API_KEY=XXXXxxxx
REACT_APP_AUTH_DOMAIN=xxxxXXXX.firebaseapp.com
REACT_APP_DATABASE_URL=https://xxxXXXX.firebaseio.com
REACT_APP_PROJECT_ID=xxxxXXXX
REACT_APP_STORAGE_BUCKET=xxxxXXXX.appspot.com
REACT_APP_MESSAGING_SENDER_ID=xxxxXXXX
```

### Запуск
`npm start`

Запуск в режиме разработки на
[http://localhost:3000](http://localhost:3000)

