
// global state management create once blue print use any where by creating the instances...

// class Counter {
//     count = $state(0)
//     constructor() {
//         $effect(() => {
//             console.log(this.count,"this is re-running")
//         })
//     }
//     increment = ()=>{
//         this.count +=1
//     }
//     reset = () => {
//         this.count = 0
//     }
// }

// function Counter(){
//     let value = $state(0)
//     console.log('logging the Value :::', value)
//     $effect(() => {
//         console.log(value,"value is running.....")
//     })
//     return {
//         // count : value , // value is created with 0 every time the new instance or update is happend that is the reason we need to use the getter function to get the latest value
//         // here we have mentioned explicted mentioned the get value because
//         get count() {
//             return value
//         },
//         increment: () => {
//             value += 1 
//             console.log(value,"incremented")
//         },
//         reset: () => {
//             value = 0
//             console.log(value,'reseted...')
//         }
//     }

// }

// export default Counter;



//  ###########---------------The Above Code share the Indiviual Instances across multiple Componet----------------######################



// global state management in Svelte (ex:like redux in react)





// let count = $state(0)

// export const counter = {
//     get value() {
//         return count
//     },
//     set value(v) {
//         count = v
//         return true
//     },
//     increment() {
//         count += 1;
//     },
//     reset() {
//         count = 0
//     }
// }




// ------------------using classe we can share or replicate the behaviour of the global state management

// class Counter{
//     value = $state(0)
   
//     constructor() {
//         $effect.root(() => {
//             $effect(() => {
//                 console.log(this.value,"re-running.....")
//             })
//         })   
//     }
//     increment = () => {
//         this.value ++
//     }
//     reset = () => {
//         this.value = 0
//     }
// }

// const counter = new Counter()
// export default counter



// ---------------- we can replicate global state management using proxies as well --------------

let count = $state({value : 0})

$effect.root(() => {
    $effect(() => {
        console.log(this.value)
    })
}) 

export default count

export function increment() {
    count.value += 1;
}

export function reset() {
    count.value = 0;
}