const user = [
    {
        username: "yeshudong",
        userpwd: '123456'
    }
]

if (localStorage) {
    if (!localStorage.getItem('__user__')) {
        localStorage.setItem('__user__', JSON.stringify(user))
    }
}