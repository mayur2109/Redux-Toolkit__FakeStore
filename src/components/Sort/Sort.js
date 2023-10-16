import React from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import { useDispatch } from 'react-redux'
import { sortProductsByCategory,sortByPrice,sortReverse} from '../../store/productSlice'
import './Sort.scss'
const Sort = () => {
  const dispatch = useDispatch()
  const options1 = [
    "All","electronics","jewelery","men's clothing","women's clothing"
  ];

  const options2 = [
    "Sort","Asc","Desc"
  ];

  const defaultOption1 = options1[0];
  const defaultOption2 = options2[0];
  return (
    <div className='sort'>
        <ul className="sort-filter">
            <li className="sort-item">
              <Dropdown
                className="dropdown"
                options={options1}
                value={defaultOption1}
                placeholder="Select an option"
                onChange={(value)=>dispatch(sortProductsByCategory(value.value))}
              />
            </li>
            <li className="sort-item">
                <Dropdown
                  className="dropdown"
                  options={options2}
                  value={defaultOption2}
                  placeholder="Select an option"
                  onChange={(value)=>{
                    if(value.value ==='Sort'){
                      return
                    }else if(value.value === 'Asc'){
                      dispatch(sortByPrice())
                    }
                    else{
                      dispatch(sortReverse())
                    }
                  }}
                />
            </li>
        </ul>
    </div>
  )
}

export default Sort