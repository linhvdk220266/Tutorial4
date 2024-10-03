Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">
      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
      </p>
      <p>
        <label for="review">Review: </label>
        <textarea id="review" v-model="review"></textarea>
      </p>
      <p>
        <label for="rating">Rating: </label>
        <select id="rating" v-model.number=Trating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>
      <p>
        <input type="submit" value="Submit">
      </p>

    </form>`
    ,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            reviews: []
        }
    },
    method: {
        onSubmit() {
            let productReview = {
                name: this.name,
                review: this.review,
                rating: this.rating
            } 
            this.$emit('review-submitted', productReview)
            this.name = null
            this.review = null
            this.rating = null
        },
        addReview(productReview) {
            this.reviews.push(productReview)
          }
    }
}),
    Vue.component('product', {
        props: {
            premium: {
                type: Boolean,
                required: true
            }
        },
        template: `
    <div class="product">
      <div class="product-image">
        <img v-bind:src="image" v-bind:alt="altText">
      </div>
      <div class="product-info">
        <h1>{{ product }}</h1>
        <!-- <p>{{ description }}</p> -->
        <!-- Lesson 3 -->
        <p v-if="inStock">In Stock</p>
        <p v-else :class="{ 'line-through': !inStock }">Out of Stock</p>
        <p>Shipping: {{ shipping }}</p>
        <!-- Challenge 3 -->
        <!-- <p v-if="onSale > 3">On Sale!</p>
        <p v-else-if="onSale <= 3 && onSale >0">Almost sold out!</p>
        <p v-else>Sold out!</p> -->

        <ul>
          <li v-for="detail in details">{{detail}}</li>
        </ul>
        <div v-for="(variant, index) in variants" 
              :key="variant.variantId" 
              class="color-box"
              :style="{backgroundColor: variant.variantColor}"
               @mouseover="updateProduct(index)">
        </div>
        
        <p>Size:</p>
        <ul>
          <li v-for="size in sizes">{{size}}</li>
        </ul>

        <!-- Lesson 5 -->
        <button v-on:click="addToCart" :disabled="!inStock" :class="{disabledButton: !inStock}">Add</button>
        <!-- Challenge 5 -->
        <button v-on:click="removeFromCart">Remove</button>

        


        <!-- <a :href="hrefText">Intro to Vue 2</a> -->
      </div>
    </div>`
        ,
        data() {
            return {
                product: 'Socks',
                description: 'A pair of warm, fuzzy socks',
                // image: "./assets/images/socks_green.jpg",
                altText: "A pair of socks",
                hrefText: "https://www.vuemastery.com/courses/intro-to-vue-js/attribute-binding",
                selectedVariant: 0,
                // inStock: false,
                onSale: 2,
                details: ["80% cotton", "20% polyester", "Gender-neutral"],
                variants: [
                    {
                        variantId: 2234,
                        variantColor: "green",
                        variantImage: "./assets/images/socks_green.jpg",
                        variantQuantity: 10
                    },
                    {
                        variantId: 2235,
                        variantColor: "blue",
                        variantImage: "./assets/images/socks_blue.jpg",
                        variantQuantity: 0
                    },
                ],
                sizes: ["Small", "Medium", "Large", "XLarge"]
            }
        },
        methods: {
            addToCart() {
                this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
            },
            updateProduct(index) {
                this.selectedVariant = index
                console.log(index)
            },
            removeFromCart() {
                this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
            }
        },
        computed: {
            title() {
                return this.brand + '' + this.product
            },
            image() {
                return this.variants[this.selectedVariant].variantImage
            },
            inStock() {
                return this.variants[this.selectedVariant].variantQuantity
            },
            shipping() {
                if (this.premium) {
                    return "Free"
                }
                return 2.99
            }
        }
    })
var app = new Vue({
    el: '#app',
    data: {
        premium: false,
        cart: []
    },
    methods: {
        addCart(id) {
            this.cart.push(id)
        },
        removeCart(id) {
            this.cart.pop(id)
        }
    }
})