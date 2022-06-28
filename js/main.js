const elList = document.getElementById('list');
const elSelect = document.getElementById('product-manufacturer')
const elForms = document.getElementById('forms_edit')
const elForm = document.getElementById('form')
const elTitleadd = document.getElementById('product-title')
const elPriceadd = document.getElementById('price')
const elBenefistadd = document.getElementById('benefits')
const elFormproduct = document.getElementById('Add_product')
const elSearch = document.getElementById('search')
const elCount = document.getElementById('count')
const elAdd = document.getElementById('add')
const elTitle = document.getElementById('phone')
const elPrice = document.getElementById('price_phone')
const elManfacture  = document.getElementById('phone_manufacture')
const elBenefist = document.getElementById('benefits_phone')
const elFrom = document.getElementById('from')
const elTo = document.getElementById('to')
const elFromselect = document.getElementById('manufacturer')
const elSort = document.getElementById('sortby')
const elLow = document.getElementById('price_low')
const elHeight = document.getElementById('price_height')
const elAddproduct = document.getElementById('add_prodduct')
elCount.textContent = `Count: ${products.length}`

const dataJson = JSON.parse(localStorage.getItem('products')) || []
function create (tagName,cllasName = '',content = ''){
    const element = document.createElement(tagName);
    if (cllasName){
        element.className = (cllasName);
    }
    if(content && typeof content ==='string'){
        element.textContent = content;
        return element;
    } else if(content){
        element.append(content)
        return element
    }
    return element;
}
function getData (data){
    const newDAta = new Date(data);
    return `${newDAta.getFullYear()}/${newDAta.getMonth() + 1}/${newDAta.getDate()}`
}
 
function render (i){
    const {title,img,price,model,addedDate,benefits,id} = i;
    const openForm = (event) =>{
        const currentIndex = products.findIndex(product => product.id === +current);
        elList.innerHTML = '';
        event.preventDefault();
        if (elTitle.value.trim() && elPrice.value.trim()){
            const product  = {
                id:id,
                img:img,
                addedDate:addedDate,
                model:elManfacture.value,
                title:elTitle.value,
                price:elPrice.value,
                benefits:elBenefist.value.split(',')
            }
            products.splice(currentIndex,1,product);
            localStorage.setItem('products',JSON.stringify(products))
            products.forEach(el =>{
                render(el);
            })
            // timedRefresh(100)
        }
    }
    const openbtn = () =>{
        elAddto.classList.add('open')
        elClose.addEventListener('click',closebtn)
        elBtnsecondary.removeEventListener('click',openbtn)
        elForms.addEventListener('submit',openForm)
    }
    const closebtn = () => {
        elAddto.classList.remove('open')
        elBtnsecondary.addEventListener('click',openbtn)
        elForms.removeEventListener('submit',openForm)
    }
    const elItem = create('li','col-4','');
    elItem.id = 'item';
    elItem.setAttribute('data-id',id)
    const elCard = create('div','card','');
    const elCardimg = create('img','card-img-top','')
    elCardimg.src = img;
    const elCardbody = create('div','card-body','');
    const elCardtitle = create('h3','card-title',title);
    const elCardtxt = create('p','card-text fw-bold','');
    const elMark = create('mark','',price);
    const elCardtxtdel = create('p','card-text','');
    const elDel = create('s','',price);
    const elBadge = create('p','badge bg-success',model);
    const elBadgetxt = create('p','card-text',getData(addedDate));
    const elListcard = create('ul','d-flex flex-wrap list-unstyled','');
    for (j =0; j <= i.benefits.length -1; j++){
        const elItemcard = create('li','badge bg-primary me-1 mb-1',benefits[j])
        elListcard.append(elItemcard)
    }
    const elCardbtn = create('div','position-absolute top-0 end-0 d-flex','')
    const elAddto = document.querySelector('#modal-content')
    const elClose = elAddto.querySelector('#btn-x')
    const elBtnsecondary = create('button','btn btn-outline-secondary student-edit bg-secondary');
    elBtnsecondary.id = 'btn-edit'
    elBtnsecondary.addEventListener('click',openbtn)
    const elBtndanger = create('button','btn rounded-0 btn-danger','')
    elBtndanger.id = 'btn-danger'
    elList.append(elItem);
    elItem.append(elCard);
    elCard.append(elCardimg,elCardbody);
    elCardbody.append(elCardtitle,elCardtxt,elCardtxtdel,elBadge,elBadgetxt,elListcard,elCardbtn);
    elCardtxt.append(elMark);
    elCardtxtdel.append(elDel);
    elCardbtn.append(elBtnsecondary,elBtndanger)
}
dataJson.forEach(el =>{
    if (elManfacture.value){
        const elOption = create('option','',el.model);
        elOption.value = el.model
        elManfacture.append(elOption)
    }
})
dataJson.forEach(el =>{
    const elOption = create('option','',el.model);
    elSelect.append(elOption)
})
dataJson.forEach(el => render(el))

elList.addEventListener('click', e =>{
    const current = e.target.closest('#item').dataset.id;
    if (e.target.matches('#btn-danger')){
        elList.innerHTML = ''
        const currentId = products.findIndex(product => product.id === +current);
        products.splice(currentId,1);
        localStorage.setItem('products',JSON.stringify(products))
        dataJson.forEach(el =>{
            render(el);
        })
        timedRefresh(100)
        elCount.textContent = `Count: ${products.length}`
    } else if (e.target.matches('#btn-edit')){
        const currentIndex = products.findIndex(product => product.id === +current);
        const {id,title,img,addedDate,model,benefits,price} = products[currentIndex]
        elTitle.value =  title;
        elPrice.value = price;
        elManfacture.value = model
        elBenefist.value = benefits;
        const openForm = (event) =>{
            elList.innerHTML = '';
            event.preventDefault();
            if (elTitle.value.trim() && elPrice.value.trim()){
                const product  = {
                    id:id,
                    img:img,
                    addedDate:addedDate,
                    model:elManfacture.value,
                    title:elTitle.value,
                    price:elPrice.value,
                    benefits:elBenefist.value.split(',')
                }
                products.splice(currentIndex,1,product);
                localStorage.setItem('products',JSON.stringify(products))
                dataJson.forEach(el =>{
                    render(el);
                })
                timedRefresh(100)
            }
        }
        elForms.addEventListener('submit', openForm)
    }
})
function timedRefresh(timeoutPeriod) {
    setTimeout("location.reload(true);",timeoutPeriod);
}
manufacturers.forEach(el =>{
    const elOptionselect = create('option', '',el.name);
    elFromselect.append(elOptionselect)
})

  
elForm.addEventListener('submit', event =>{
elList.innerHTML = '';    
        products.forEach(element =>{
            const re = new RegExp(elSearch.value,'gi')
            event.preventDefault();
            if (elSearch.value && element.title.match(re)){
                 render(element);
                }
                else if (elFrom.value && element.price >= elFrom.value){
                    if (!elTo.value){
                    render(element);
                }else if (element.price <= elTo.value){
                    render(element);
                }
            }else if (elTo.value && element.price <= elTo.value){
                if (elPrice.value >= elForm.value){
                    render(element);
                } else if(!elFrom.value){
                    render(element)
                }
            }else if (elFromselect.value && element.model.includes(elFromselect.value)){
                render(element);
            }
            else if (elFromselect.value == 'ALL' && elSort.value == 1 && !elTo.value && !elFrom.value && !elSearch.value){
                render(element);
            }
        else if (elSort.value.includes(elLow.value) && element.price <= 500){
                render(element);
            } else if (elSort.value.includes(elHeight.value) && element.price >= 500){
                render(element)
            }
        }) 
       
        
    })
elFormproduct.addEventListener('submit', e =>{
    e.preventDefault()
    const newDate = new Date();
    products.push({
        id:`10${products.length}`,
        title:`${elTitleadd.value}`,
        img:`https://picsum.photos/300/200`,
        price:`${elPriceadd.value}`,
        model:`${elSelect.value}`,
        addedDate: `${newDate.getFullYear()}/${newDate.getMonth()+1}/${newDate.getDate()}`,
        benefits:elBenefistadd.value.split(',')
    })
    localStorage.setItem('products',JSON.stringify(products))
    elList.innerHTML = '';
    products.forEach(el =>  render(el))
})
elCount.textContent = `Count: ${products.length}`

// function add(){
//     console.log(this.x+this.y);
   
// }
// function remove(){
//     console.log(this.x-this.y);
// }

// const obj = {
//     x:5,
//     y:7
// } 
// add.call(obj);
// remove.call(obj)