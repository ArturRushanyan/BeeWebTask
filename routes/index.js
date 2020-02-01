import Notes from './Notes/notes';

const noteRoutes = (app) => {
    app.use('/api/notes', Notes);

};

export default noteRoutes;
