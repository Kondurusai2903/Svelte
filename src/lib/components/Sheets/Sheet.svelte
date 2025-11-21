

<script>

    // -----------------Parent Component Block ---------------------------------
    // let data = $state([
	// 	[
	// 		{ value: 'Item', bgColor: '#6aa84f', color: '#ffffff' },
	// 		{ value: 'Price', bgColor: '#6aa84f', color: '#ffffff' },
	// 		{ value: 'Quantity', bgColor: '#6aa84f', color: '#ffffff' },
	// 		{ value: 'Total', bgColor: '#51803d', color: '#ffffff' }
	// 	],
	// 	[{ value: 'Milk' }, { value: '3' }, { value: '2' }, { value: '=MULTIPLY(B2,C2)' }],
	// 	[{ value: 'Oats' }, { value: '4' }, { value: '1' }, { value: '=MULTIPLY(B3,C3)' }],
	// 	[{ value: 'Honey' }, { value: '5' }, { value: '2' }, { value: '=MULTIPLY(B4,C4)' }],
	// 	[{ value: 'Strawberries' }, { value: '2' }, { value: '2' }, { value: '=MULTIPLY(B5,C5)' }],
	// 	[
	// 		{ value: '', bgColor: '#b4a7d6' },
	// 		{ value: '', bgColor: '#b4a7d6' },
	// 		{ value: 'Total', bgColor: '#b4a7d6' },
	// 		{ value: '=SUM(D2,D3,D4,D5)', bgColor: '#8e7eb6' }
	// 	]
	// ]);

    // <Sheet bind:data={data} />
    // -----------------Parent Ending Block ---------------------------------


	import { alphabetToNumber, cellToIndex, numberToAlphabet } from "../utils/sheet-utilst-utils";


    let { data = $bindable() } = $props()

   


    let selectedCell = $state(null)
    let editableCell = $state(null)


    let nRows = $derived.by(()=>{
       return data.length > 10 ? data.length : 10
    })
    let nCols = $derived.by(()=>{
        let largestColumn = Math.max(...data.map((obj)=>obj.length))
        return largestColumn > 10 ? largestColumn : 10
    })
    let selectedCellObject = $derived.by(() => {
		if (!selectedCell) return null;
		const [row, col] = selectedCell.split(',');
		return data[+row - 1]?.[+col - 1];
	});

    function parseValue(value) {
		if (!value) return '';
		if (value.startsWith('=')) {
			const funcName = value.split('(')[0].substring(1);
			const args = value.replace(`=${funcName}`, '').replace(/[()]/g, '').split(',');
			const vals = args.map((arg) => {
				const cell = cellToIndex(arg);
				const val = data[cell.row - 1]?.[cell.col - 1]?.value;
				if (val?.startsWith('=')) {
					return Number(parseValue(val));
				}
				return val ? Number(val) : 0;
			});
			return vals.reduce(
				(prev, curr) => {
					if (funcName === 'SUM') {
						return prev + curr;
					}
					if (funcName === 'MULTIPLY') {
						return prev * curr;
					}
					return 0;
				},
				funcName === 'MULTIPLY' ? 1 : 0
			);
		} else {
			return value;
		}
	}

    function setCellData(row,col,key="value",value){
        // const newData = [...data]
        if(data[row]){
            if(data[row][col]){
                data[row][col][key] =value
            }else{
                data[row][col]= { [key]: value}
            }
        }else{
            data[row]=[]
            data[row][col]={ [key]:value}
        }
        // data = [...newData]
    }
  


    function init(e){
        e.focus()
        e.select()
    }

</script>

<table class="sheet">
    <tbody>
        {#each { length : nRows+1 },row}
            <tr>
                {#each { length:nCols+1 },col}
                    {@const currentCell = `${row},${col}`}
                    {@const cellData = data?.[row - 1]?.[col - 1]}
                    <svelte:element
                       role ="presentation"
                       this = {row === 0 || col === 0 ? 'th' : "td"}
                       class:selected={selectedCell === currentCell}
                       style:background-color={cellData?.bgColor}
                       style:color={cellData?.color}
                       ondblclick={()=>{
                          if(row === 0 || col ===0) return ;
                          editableCell = currentCell
                          console.log(editableCell)
                       }}
                       onclick ={()=>{
                          if (currentCell === selectedCell || row == 0 || col == 0) return;
                          selectedCell = currentCell;
                          editableCell = null
                       }}
                    >
                      {#if row === 0 && col > 0}
                          {numberToAlphabet(col)}
                      {/if}
                      {#if col === 0 && row > 0}
                         {row}
                      {/if}
                      {#if editableCell !== currentCell}
                            {parseValue(cellData?.value)} 
                       {:else}
                            <input 
                               use:init
                               type = 'text'
                               value = {cellData?.value ?? ""}
                               oninput = {(e)=>{
                                  setCellData(row-1,col-1,"value",e.target.value)
                               }}
                            />
                      {/if}
                    </svelte:element>
                {/each}
            </tr>
        {/each}
    </tbody>
</table>

{#if selectedCell}
	<br />
	<label for="bgColor">Background</label>
	<input
		type="color"
		id="bgColor"
		value={selectedCellObject?.bgColor || '#222222'}
		oninput={(e) => {
			if (!selectedCell) return;
			const [row, col] = selectedCell?.split(',');
			setCellData(+row - 1, +col - 1, 'bgColor', e.currentTarget.value);
		}}
	/>
	<label for="color">Font Color</label>
	<input
		type="color"
		id="color"
		value={selectedCellObject?.color || '#ffffff'}
		oninput={(e) => {
			if (!selectedCell) return;
			const [row, col] = selectedCell?.split(',');
			setCellData(+row - 1, +col - 1, 'color', e.currentTarget.value);
		}}
	/>
	<br />
	<br />
{/if}



<style>
    .sheet{
       border-collapse: collapse;
       font-family: sans-serif;
    }
    *{
       margin:0;
       padding:0;
    }
    th,td{
        text-align: center;
        min-width: 100px;
        height: 30px;
        border: 1px solid #393939;
    }
    .selected{
        border : 2px solid blue;
        outline-offset: -2px;
    }
    input {
        width: 100%;
        height: 100%;
        padding: 5px;
        margin: 0;
        border: none;
        font-size: 16px;
        background-color:#fff;
        color: #222;
    }

</style>