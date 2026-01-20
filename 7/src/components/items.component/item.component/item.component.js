import classes from './item.module.css'

export const ItemComponent = ({ item }) => {
  const { image, title, price, salePrice, currency = '$' } = item
  const onSale = salePrice && Number(salePrice) < Number(price)

  return (
    <article className={classes.card}>
      <div className={classes.media}>
        {onSale && <div className={classes.sale}>SALE</div>}
        <img className={classes.img} src={image} alt={title} />
      </div>

      <h3 className={classes.name}>{title}</h3>

      <div className={classes.priceRow}>
        {onSale ? (
          <>
            <span className={classes.priceSale}>{currency}{salePrice}</span>
            <span className={classes.priceOld}>{currency}{price}</span>
          </>
        ) : (
          <span className={classes.price}>{currency}{price}</span>
        )}
      </div>
    </article>
  )
}
