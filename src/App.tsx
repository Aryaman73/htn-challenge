import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
import sortBy from "lodash/sortBy";
import { useEffect } from "react";

import './App.css';

import EventBox from "./components/EventBox"
import Header from "./components/Header";
import { TEvent } from "./types/eventTypes";

const client = new ApolloClient({
  uri: 'https://api.hackthenorth.com/v3/graphql',
  cache: new InMemoryCache()
});

const EVENTS_QUERY = gql`
  query {
    sampleEvents { 
        id 
        name 
        event_type 
        permission 
        start_time 
        end_time 
        description 
        speakers { 
            name 
            profile_pic 
        } 
        public_url 
        private_url 
        related_events 
    }  
  }
`;

function AppContents() {
  const { loading, error, data } = useQuery(EVENTS_QUERY);

  const orderedEvents = sortBy(data?.sampleEvents, 'start_time');
  console.log(orderedEvents);

  return (
    <div>
      <Header />
      {loading && <p> Loading... </p>}
      {error && <p> Error :( </p>}
      {!loading && !error && data && (
        orderedEvents?.map((event: TEvent) => {
          return (
            <div>
              <EventBox event={event} />
            </div>


          )
        })
      )}
    </div>
  );
}


function App() {

  return (
    <ApolloProvider client={client}>
      <AppContents />
    </ApolloProvider>
  );
}

export default App;
