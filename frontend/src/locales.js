const ru = {
  translation: {
    logout: 'Выйти',
    notFound: 'Страница не найдена',
    login: {
      title: 'Вход',
      username: 'Ваш ник',
      password: 'Пароль',
      submit: 'Войти',
      registerText: 'Регистрация',
      errors: {
        invalidCredentials: 'Неверные имя пользователя или пароль',
      },
    },
    signup: {
      title: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      submit: 'Зарегистрироваться',
      errors: {
        usernameInvalidLength: 'Имя должно быть от 3 до 20 символов',
        passwordInvalidLength: 'Пароль должен быть не менее 6 символов',
        confirmPasswordInvalid: 'Пароли должны совпадать',
        userExisted: 'Такой пользователь уже существует',
      },
    },
    channel: {
      mainTitle: 'Каналы',
      channelManagmentTitle: 'Управление каналом',
      messagesCount: '{{count}} сообщение',
      messagesCount_one: '{{count}} сообщение',
      messagesCount_few: '{{count}} сообщения',
      messagesCount_many: '{{count}} сообщений',
      placeholder: 'Введите сообщение...',
      ariaLabel: 'Новое сообщение',
      submit: 'Отправить',
      deleteChannel: 'Удалить',
      editChannelName: 'Переименовать',
      errors: {
        channelNameInvalidLength: 'Название должно быть от 3 до 20 символов',
        channelExisted: 'Канал с таким названием уже существует',
      },
      editModal: {
        title: 'Переименовать канал',
        label: 'Имя канала',
        submit: 'Отправить',
        cancel: 'Отменить',
      },
      deleteModal: {
        title: 'Удалить канал',
        submit: 'Удалить',
        cancel: 'Отменить',
        sure: 'Вы уверены?',
      },
      addModal: {
        title: 'Добавить канал',
        label: 'Имя канала',
        submit: 'Отправить',
        cancel: 'Отменить',
      },
    },
    toasts: {
      channelCreated: 'Канал создан',
      channelRemoved: 'Канал удалён',
      channelRenamed: 'Канал переименован',
      networkError: 'Проблема с сетью. Проверьте подключение',
      loadingError: 'Ошибка выполнения запроса',
    },
  },
};

const en = {
  translation: {
    logout: 'Logout',
    notFound: 'Page not found',
    login: {
      title: 'Login',
      username: 'Username',
      password: 'Password',
      submit: 'Submit',
      registerText: 'Register',
      errors: {
        invalidCredentials: 'Invalid username or password',
      },
    },
    signup: {
      title: 'Registration',
      username: 'Username',
      password: 'Password',
      confirmPassword: 'Confirm password',
      submit: 'Submit',
      errors: {
        usernameInvalidLength: 'The name must be between 3 and 20 characters long',
        passwordInvalidLength: 'The password must be at least 6 characters long',
        confirmPasswordInvalid: 'Passwords must match',
        userExisted: 'A user with that name already exists',
      },
    },
    channel: {
      mainTitle: 'Channels',
      channelManagmentTitle: 'Channel management',
      messagesCount: '{{count}} message',
      messagesCount_one: '{{count}} message',
      messagesCount_few: '{{count}} messages',
      messagesCount_many: '{{count}} messages',
      placeholder: 'Enter a message...',
      ariaLabel: 'Enter a message...',
      submit: 'Send',
      deleteChannel: 'Delete',
      editChannelName: 'Rename',
      errors: {
        channelNameInvalidLength: 'The name must be between 3 and 20 characters long',
        channelExisted: 'A channel with that name already exists',
      },
      editModal: {
        title: 'Rename channel',
        label: 'Channel name',
        submit: 'Submit',
        cancel: 'Cancel',
      },
      deleteModal: {
        title: 'Delete channel',
        submit: 'Delete',
        cancel: 'Cancel',
        sure: 'Are you sure?',
      },
      addModal: {
        title: 'Add channel',
        label: 'Channel name',
        submit: 'Submit',
        cancel: 'Cancel',
      },
    },
    toasts: {
      channelCreated: 'Channel created',
      channelRemoved: 'Channel removed',
      channelRenamed: 'Channel renamed',
      networkError: 'Network problem. Check connection',
      loadingError: 'Request execution error',
    },
  },
};

export { ru, en };
