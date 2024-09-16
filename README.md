# Magazine Dashboard

This application allows users to view, add, edit, and destroy magazine issues.

It uses Ruby on Rails as the backend api and React.js for the front-end.

Here is a demonstration of the functionality:


https://github.com/user-attachments/assets/2269ab53-b169-4810-a7d3-6f5121384cef

## Instructions:

Clone Repo
```
git clone git@github.com:maxfrda/magazine_dashboard.git
```
swith to repo
```
cd magazine_dashboard
```

install gems
```
bundle install
```

create, migrate, and populate database
```
rails db:create && rails db:migrate && rails db:seed
```

start rails server
```
rails s
```

switch to react app in new window
```
cd frontend
```

install packages
```
npm install
```
Start react server
```
npm start
```

You should see 2 magazines, each with a list of issues. 




