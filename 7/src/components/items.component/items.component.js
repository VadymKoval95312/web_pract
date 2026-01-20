import classes from './items.module.css'
import { itemsData } from './items.data.js'
import { ItemComponent } from './item.component/item.component.js'

export const ItemsComponent = () => {
  return (
    <main className={classes.main}>
      <div className={classes.container}>
        <h1 className={classes.title}>Featured Products</h1>

        <div className={classes.grid}>
          {itemsData.map((item) => (
            <ItemComponent key={item.id} item={item} />
          ))}
        </div>
      </div>
    </main>
  )
}
