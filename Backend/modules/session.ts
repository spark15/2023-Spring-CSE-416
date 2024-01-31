import session from 'express-session';
import { MongoClient } from 'mongodb';
import MongoDBStore from 'connect-mongodb-session';

const MongoDBStoreSession = MongoDBStore(session);

// Create a new MongoDBStore instance
const store = new MongoDBStoreSession({
  uri: 'mongodb+srv://sukoco:T8dv9N3FYAuiKtJy@cse416.xaulrya.mongodb.net/?retryWrites=true&w=majority', // MongoDB connection URI
  collection: 'sessions', // Collection name for storing sessions
  expires: 1000 * 60 * 60 * 24, // Session expiration time in milliseconds (e.g., 1 day)
});

// Catch errors if any while initializing the session store
store.on('error', (error) => {
  console.error('Session store error:', error);
});

// Configure session middleware
const sessionMiddleware = session({
  secret: 'your_session_secret', // Secret key for signing the session ID cookie
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // Expiry time for the session ID cookie (e.g., 1 day)
  }
});

export default sessionMiddleware;