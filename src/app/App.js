import './App.css';
import React from 'react';
import data from '../data.json';
import ListItem from '../list-item/list-item';
import ListHeader from '../list-item/list-header';

function App() {
  const [items, setItems] = React.useState(data.items);
  const [idRegularSort, setIdSort] = React.useState(true);
  const [descriptionFilter, setDescriptionFilter] = React.useState('');
  const [selectedTag, selectTag] = React.useState('empty');

  const toggleIdSort = () => {
    setIdSort(!idRegularSort);
  }

  const sortItems = (comparator) => {
    const newItems = items;
    newItems.sort(comparator);
    setItems(newItems);
  }

  React.useEffect(() => {
    sortItems((a, b) => {
      if (a.id === null) return 1;
      if (b.id === null) return -1;
        return ((a.id > b.id) !== idRegularSort) ? 1 : -1
      }
    )
  }, [idRegularSort]);

  const descriptionFilterChanged = (e) => {
    e.preventDefault();
    setDescriptionFilter(e.target.value.replace(/\s+/g,' ' ).trim());
  }

  const selectedTagChanged = (e) => {
    selectTag(e.target.value);
  }

  const preparedData = React.useMemo(
    () => {
      return !items.length ? 
      [] : 
      items.map((item) => {
        return (
          <ListItem data={item} key={item.id} descriptionFilter={descriptionFilter} selectedTag={selectedTag} />
        );
      })
    }, [items, idRegularSort, descriptionFilter, selectedTag]
  );



  return (
    <div className="App">
      <div className='filters'>
        <div>
          <button onClick={toggleIdSort}>Сортировка по id по {idRegularSort ? 'убыванию' : 'возрастанию'}</button>
        </div>
        <div>
          <p className='no_margin'>Поиск по описанию</p>
          <input onChange={descriptionFilterChanged}/>
        </div>
        <div>
          <p className='no_margin'>Сортировка по флагу</p>
          <select onChange={selectedTagChanged}>
            <option value='empty'>не выбрано</option>
            <option value='альфа'>альфа</option>
            <option value='бета'>бета</option>
            <option value='гамма'>гамма</option>
            <option value='омега'>омега</option>
            <option value='сигма'>сигма</option>
          </select>
        </div>
      </div>
      <ul>
        <ListHeader key={0}/>
        {preparedData}
      </ul>
    </div>
  );
}

export default App;
