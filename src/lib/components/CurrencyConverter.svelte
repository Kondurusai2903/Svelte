<script>

    // ------------------Parent Component -------------------------
    // import CurrencyConverter from "$lib/components/CurrencyConverter.svelte";
    // <CurrencyConverter />
    // -----------------------
    import rates from "$lib/utils/dummy-rates";

    let baseValue = $state(1)   // used to store dynamic value to convert 
    let baseCurreny = $state("usd")  // used to store currencites like usd ,euro etc...

    // let targetValue = $state(1234)
    let targetCurrency = $state("eur") // this is used to calucuate the target currentcy value

    let targetValue = $derived.by(()=>{
        let Value = baseValue * rates[baseCurreny][targetCurrency]
        return Value.toFixed(2)
    })   // this  will be calculated dynamically 
    // let targetValue = $state("0.96")

    // function baseValueUpdate(value) {
    //     baseValue = value
    //     targetValue = (value * rates[baseCurreny][targetCurrency]).toFixed(2)
    // }
    // function targetValueUpdate(value) {
    //     targetValue = value
    //     baseValue = (value / rates[baseCurreny][targetCurrency]).toFixed(2)
    // }
</script>

<div class="container">
    <div class="wrapper">
            <input type="number" 
                bind:value={
                    ()=>baseValue,
                    (value)=>{
                        if(value < 0){
                            baseValue = 1
                            return 
                        }
                        baseValue = value
                    }
                }
            />
            <select bind:value={baseCurreny} class="border-left" >
                {#each Object.keys(rates) as rate}
                (rate)
                <option>{rate}</option>
                {/each}
            </select>
    </div>
    <br/>
    <div class="wrapper">
        <!-- value={targetValue}
        oninput={(e)=>{
           targetValueUpdate(e.target.value)
        }} -->
        <input type="number"  
             bind:value={targetValue}
        />
        <select bind:value={targetCurrency} class="border-left" >
            {#each Object.keys(rates) as rate}
            (rate)
                <option value={rate}>{rate}</option>
            {/each}
        </select>
    </div>
</div>


<style>
    .container{
        height:100vh;
        width:100vw;
        display:flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        
    }
    .wrapper{
        display:flex;
        align-items: center;
        justify-items: center;
        margin-bottom: 2rem;
    }
    .border-left{
        border-left: 1px solid black;
    }
    select,input{
        background-color:white;
        color:#222;
        padding:0.3rem;
        font-size:1rem;
        border:none;
        height:40px;
    }


</style>