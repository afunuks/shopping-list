import { useEffect, useState } from 'react'
import add from './assets/add.svg'

import './App.css'

function App() {
  const [newItem, setNewItem] = useState('')
  const [newQuantity, setNewQuantity] = useState(1)
  const [newPrice, setNewPrice] = useState(1)
  const [newNumber, setNewNumber] = useState(1)

  const [shoppingList, setShoppingList] = useState([])
  const [Total, setTotal] = useState(0)
  const [completed, setCompleted] = useState(false)

  const [allCompleted, setAllCompleted] = useState(false)

  function handleSumbit(e){
    e.preventDefault()

    setShoppingList((currentShoppingList) =>{
      return [...currentShoppingList, {id:crypto.randomUUID(),number:newNumber,item:newItem,quantity:newQuantity,price:newPrice,completed:false},  ]
    })
    console.log(shoppingList)
    setNewItem('')
    setNewQuantity(1)
    setNewPrice(1)
    setNewNumber(newNumber+1)
    setTotal(Total+(newQuantity*newPrice))
    
  }


  function toggleItem(id,completed){
    setShoppingList(currentShoppingList =>{
      return currentShoppingList.map((item) =>{
        if(item.id === id){
          return {...item, completed}
        }
        return item
      })
    })
    
    
    // var allTrue = false
    // allTrue = shoppingList.every((item) => item.completed === true)
    // setAllCompleted(allTrue)

    // console.log(allCompleted)


  }

  function deleteItem(id){
    setShoppingList(currentShoppingList =>{
      return currentShoppingList.filter((item) =>{
        return item.id !== id
      })
    })
    
  }


  useEffect(() => {
    var allTrue = false
    allTrue = shoppingList.every((item) => item.completed === true)
    setAllCompleted(allTrue)

    setTotal(shoppingList.reduce((total,item) => total + (item.quantity*item.price),0))
    setShoppingList((currentShoppingList) =>{
      return currentShoppingList.map((item,index) =>{
        return {...item, number:index+1}
      })
    })
  })


  return (
    <>
      <h1>Shopping List</h1>
      <div className="addItem">
        <form onSubmit={handleSumbit} className='new-item-form'>
          <table> 
            <tr>            
              <th><span className='tablehead'><label htmlFor="item">Item</label></span></th>
              <th><span className='tablehead'><label htmlFor="quantity">Quantity</label></span></th>
              <th><span className='tablehead'><label htmlFor="price">Price</label></span></th>
              <th><span className='tablehead'><label htmlFor="add">Add</label></span></th>
            </tr>          
            <tr>    
              <td><span><input onChange={e=>setNewItem(e.target.value)} value={newItem} id='item' size='36' className='input' type="text" name=""/></span></td>
              <td><span><input onChange={e=>setNewQuantity(e.target.value)} value={newQuantity} id='quantity' size='10' className='input' type="number" name=""/></span></td>
              <td><span><input onChange={e=>setNewPrice(e.target.value)} value={newPrice} id='price' size='10' className='input' type="number" name=""/></span></td>
              <td><button id='add' className='add'>+</button></td>
            </tr> 
            </table>
        </form>
      </div>
      <div className="myShoppingList">
        <h2>My Shopping List</h2>
        <table className='shoppingListTable'>
            <tr>
              <th id='numberSpan'><span className='tablehead'>#</span></th>
              <th><span className='tablehead'>Completed</span></th>
              <th id='itemSpan'><span className='tablehead'>Item</span></th>  
              <th><span className='tablehead'>Quantity</span></th>
              <th><span className='tablehead'>Price</span></th>
              <th><span className='tablehead'>Total</span></th>
              <th><span className='tablehead'>Remove</span></th>
            </tr>
            {shoppingList.length === 0 && <tr><td colSpan='7'><p className='empty'>Your shopping list is empty</p></td></tr>}
            {shoppingList.map((item) => {return <tr id={item.id}>
                <td><span className='tablecontent'>{item.number}</span></td>
                <td><span className='tablecontent'><input onChange={e=>toggleItem(item.id,e.target.checked)} type="checkbox" checked={item.completed} name="" id="" /></span></td>
                <td><span className='tablecontent'>{item.item}</span></td>
                <td><span className='tablecontent'>{item.quantity}</span></td>
                <td><span className='tablecontent'>{(item.price*1).toFixed(2)}</span></td>
                <td><span className='tablecontent'>{(item.quantity*item.price).toFixed(2)}</span></td>
                <td><span className='tablecontent' onClick={()=>deleteItem(item.id)}>-</span></td>
              </tr>
            })}
            </table>
      </div>
      <div className="footer">
      <table>
            <tr>            
              <th><span className='tablehead'>Completed</span></th>
              <th><span className='tablehead'></span></th>
              <th><span className='tablehead'></span></th>
              <th><span className='tablehead'>Total</span></th>
            </tr>          
            <tr>    
              <td><span><input checked={allCompleted} type="checkbox" name="" id="" /></span></td>
              <td></td>
              <td></td>
              <td><p>${Total}</p></td>
            </tr> 
            </table>
      </div>
    </>
  )
}

export default App
