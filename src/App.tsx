import React, { useEffect, useState } from 'react';
import './App.scss';
import { GoodsList } from './GoodsList';

import { get5First, getAll, getRedGoods } from './api/goods';
import { Good } from './types/Good';
// or
// import * as goodsAPI from './api/goods';

export const App: React.FC = () => {
  const [goods, setGoods] = useState<Good[]>([]);
  const [buttonPressed, setButtonPressed] = useState('');

  useEffect(() => {
    let func;

    if (buttonPressed === '1') {
      func = getAll();
    }

    if (buttonPressed === '2') {
      func = get5First();
    }

    if (buttonPressed === '3') {
      func = getRedGoods();
    }

    if (func) {
      func.then(data => {
        return setGoods(data);
      });
    }
  }, [buttonPressed]);

  const onClick1 = () => {
    return setButtonPressed('1');
  };

  const onClick2 = () => {
    return setButtonPressed('2');
  };

  const onClick3 = () => {
    return setButtonPressed('3');
  };

  return (
    <div className="App">
      <h1>Dynamic list of Goods</h1>

      <button type="button" data-cy="all-button" onClick={onClick1}>
        Load all goods
      </button>

      <button type="button" data-cy="first-five-button" onClick={onClick2}>
        Load 5 first goods
      </button>

      <button type="button" data-cy="red-button" onClick={onClick3}>
        Load red goods
      </button>

      {buttonPressed && <GoodsList goods={goods} />}
    </div>
  );
};
