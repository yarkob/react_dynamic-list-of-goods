import React, { SetStateAction, useState } from 'react';
import './App.scss';
import { GoodsList } from './GoodsList';

import { get5First, getAll, getRedGoods } from './api/goods';
import { Good } from './types/Good';
// or
// import * as goodsAPI from './api/goods';

export const App: React.FC = () => {
  const [goods, setGoods] = useState<Good[]>([]);

  const makeHandleClick =
    (callback: () => Promise<SetStateAction<Good[]>>) => () =>
      callback().then(setGoods);

  return (
    <div className="App">
      <h1>Dynamic list of Goods</h1>

      <button
        type="button"
        data-cy="all-button"
        onClick={makeHandleClick(getAll)}
      >
        Load all goods
      </button>

      <button
        type="button"
        data-cy="first-five-button"
        onClick={makeHandleClick(get5First)}
      >
        Load 5 first goods
      </button>

      <button
        type="button"
        data-cy="red-button"
        onClick={makeHandleClick(getRedGoods)}
      >
        Load red goods
      </button>

      {!!goods.length && <GoodsList goods={goods} />}
    </div>
  );
};
