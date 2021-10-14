import express from 'express';
import handlebars from 'express-handlebars';
import * as http from 'http';
import router from '../routes/index';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
// eslint-disable-next-line no-unused-vars
import passport from '../middleware/auth';
import MongoStore from 'connect-mongo';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const publicFolderPath = path.resolve(__dirname, '../../public');
app.use(express.static(publicFolderPath));

// configuracion de hbs
const layoutDirPath = path.resolve(__dirname, '../../views/layouts');
const defaultLayerPth = path.resolve(
  __dirname,
  '../../views/layouts/index.hbs'
);
const partialDirPath = path.resolve(__dirname, '../../views/partials');

app.set('view engine', 'hbs');
app.engine(
  'hbs',
  handlebars({
    layoutsDir: layoutDirPath,
    defaultLayout: defaultLayerPth,
    extname: 'hbs',
    partialsDir: partialDirPath,
  })
);

app.use('/api/', router);

const StoreOptions = {
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/ecommerce',
  }),
  secret: 'thisismysecrctekey',
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: { maxAge: 1000 },
};

app.use(cookieParser());
app.use(session(StoreOptions));

app.use(passport.initialize());
app.use(passport.session());

// creo mi configuracion para socket
const myServer = new http.Server(app);

myServer.on('error', (err) => {
  console.log('ERROR ATAJADO', err);
});

export default myServer;
