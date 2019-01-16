import {ApiConsumer, ApiProvider} from './context';
import getProvider from './providers';
import React from 'react';
import config from '../../config';
import {API} from './api';
import {instanceOf} from 'prop-types';

const apiProvider = provider => Component => props =>
  <ApiProvider value={getProvider(provider)}>
    <Component {...props} />
  </ApiProvider>;

export const withApiProvider = apiProvider(config.apiProvider);
export const withApi = Component => props => <ApiConsumer>
  {apiProvider => {

    console.log('withApi');
    console.log((apiProvider instanceof API));

    if(apiProvider instanceof API){
      return <Component {...props} api={apiProvider}/>;
    }else{
        throw new Error('Wrong provider')
    }

  }
  }

</ApiConsumer>;


