import Note from './Notes/notes';
import User from './User/user';

const noteRoutes = (app) => {
    app.use('/api/notes', Note);
    app.use('/api/auth', User);
};

export default noteRoutes;
