axios.defaults.baseURL='https://mirror.devemmy.com/api/v1/user/';
// axios.defaults.baseURL='http://localhost:4000/api/v1/user/';

let token = localStorage.getItem("token")
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
// let showAlert = document.getElementById("showAlert")

// if (showAlert) {
//   axios({
//     url:"/transactions",
//     method:"get",
//     headers:{
//         Authorization:`Bearer ${token}`
//     }
//   })
//   .then((res)=>{
//   console.log(res.data.balance)
//     if(res.data.balance <500){
//       Swal.fire({
//         title: 'Insufficient funds please deposit!',
//         confirmButtonText: 'Deposit',
//       })
//       .then(()=>{
//         window.location.replace("../user/deposits.html")
//       })
//     }
//   })
// }

// if(!token){
//   window.location.replace("/")
// }
function formatMoney(number) {
  // Convert the number to a string
  const numberString = number.toString();

  // Split the number into whole and decimal parts (if any)
  const parts = numberString.split('.');
  let wholePart = parts[0];
  const decimalPart = parts[1] || '';

  // Add commas to the whole part
  let formattedNumber = '';
  while (wholePart.length > 3) {
    formattedNumber = ',' + wholePart.slice(-3) + formattedNumber;
    wholePart = wholePart.slice(0, wholePart.length - 3);
  }
  formattedNumber = wholePart + formattedNumber;

  // Combine the whole and decimal parts (if any)
  if (decimalPart) {
    formattedNumber += '.' + decimalPart;
  }

  return formattedNumber;
}


const SignUpForm = document.getElementById("SignUpForm")

if (SignUpForm) { 
    SignUpForm.addEventListener("submit", (e)=>{
        e.preventDefault()
        let name= SignUpForm.firstname.value +" "+ SignUpForm.lastname.value
        let email= SignUpForm.email.value
        let password= SignUpForm.password.value
       
        axios.post(`/register`,{name,email,password})
        .then((res)=>{
           Toast.fire({
            icon: 'success',
            title: `${res.data.message}`
           })
           .then(()=>{
            window.location.replace("../user/sign-in.html")
           })
        })
        .catch((err)=>{
            Toast.fire({
                icon: 'error',
                title:  `${err.response.data.message}`
              })
            console.log(err)
        })
    })
}

const SignInForm = document.getElementById("SignInForm")

if (SignInForm) {
    SignInForm.addEventListener("submit", (e)=>{
        e.preventDefault()
        let email= SignInForm.email.value
        let password= SignInForm.password.value
       
        axios.post(`/login`,{email,password})
        .then((res)=>{
            localStorage.setItem("token", res.data.token)
           Toast.fire({
            icon: 'success',
            title: `${res.data.message}`
           })
           .then(()=>{
              window.location.replace("../user/dashboard.html")
           })
            console.log(res)
        })
        .catch((err)=>{
            Toast.fire({
                icon: 'error',
                title:  `${err.response.data.message}`
              })
            console.log(err)
        })
    })
}

const depositForm =  document.getElementById("depositForm")


if (depositForm) {
    depositForm.addEventListener("submit", (e)=>{
        e.preventDefault()
        let amount = depositForm.amount.value
        let token = localStorage.getItem("token")
        axios({
            url:"/deposit",
            data:{amount},
            method:"post",
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        .then((res)=>{
            console.log(res)
           Toast.fire({
            icon: 'success',
            title: `${res.data.message}`
           })
           .then(()=>{
              window.location.reload()
           })
            console.log(res)
        })
        .catch((err)=>{
            Toast.fire({
                icon: 'error',
                title:  `${err.response.data.message}`
              })
            console.log(err)
        })
    })
}

const depositForm1 =  document.getElementById("depositForm1")


if (depositForm1) {
    depositForm1.addEventListener("submit", (e)=>{
        e.preventDefault()
        let amount = depositForm1.amount.value
        let token = localStorage.getItem("token")
        axios({
            url:"/deposit",
            data:{amount},
            method:"post",
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        .then((res)=>{
            console.log(res)
           Toast.fire({
            icon: 'success',
            title: `${res.data.message}`
           })
           .then(()=>{
              window.location.reload()
           })
            console.log(res)
        })
        .catch((err)=>{
            Toast.fire({
                icon: 'error',
                title:  `${err.response.data.message}`
              })
            console.log(err)
        })
    })
}

const depositForm2 =  document.getElementById("depositForm2")


if (depositForm2) {
    depositForm2.addEventListener("submit", (e)=>{
        e.preventDefault()
        let amount = depositForm2.amount.value
        let token = localStorage.getItem("token")
        axios({
            url:"/deposit",
            data:{amount},
            method:"post",
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        .then((res)=>{
            console.log(res)
           Toast.fire({
            icon: 'success',
            title: `${res.data.message}`
           })
           .then(()=>{
              window.location.reload()
           })
            console.log(res)
        })
        .catch((err)=>{
            Toast.fire({
                icon: 'error',
                title:  `${err.response.data.message}`
              })
            console.log(err)
        })
    })
}

const depositsList = document.getElementById("depositsList")

if (depositsList) {
    let token = localStorage.getItem("token")
    axios({
        url:"/deposits",
        method:"get",
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    .then((res)=>{
        let items = res.data
        let htmlTemp =``
        items.map((item)=>{
            htmlTemp+=` <tr>
            <td>
              <div class="d-flex px-2 py-1">
                <div>
                </div>
                <div class="d-flex flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">Deposit</h6>
                </div>
              </div>
            </td>
            <td>
              <p class="text-xs font-weight-bold mb-0">$${item.amount}</p>
            </td>
            <td class="align-middle text-center text-sm">
              <span class="badge badge-sm bg-gradient-${item.status!="approved"?"secondary":"success"}">${item.status}
              </span>
            </td>
            <td class="align-middle text-center">
              <span class="text-secondary text-xs font-weight-bold">${item.date.split("T")[0]}</span>
            </td>
          </tr>`
        })
        // console.log(htmlTemp, content)
        depositsList.innerHTML=htmlTemp
        // console.log(res)
    })
    .catch((err)=>{
        console.log(err)
    })
}

const withdrawForm = document.getElementById("withdrawForm")

if (withdrawForm) {
    withdrawForm.addEventListener("submit",(e)=>{
        e.preventDefault()
        let amount = withdrawForm.amount.value
        let wallet = withdrawForm.wallet.value
        let network = withdrawForm.network.value
        let token = localStorage.getItem("token")
        axios({
            url:"/withdraw",
            data:{amount, wallet, network},
            method:"post",
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        .then((res)=>{
            console.log(res)
           Toast.fire({
            icon: 'success',
            title: `${res.data.message}`
           })
           .then(()=>{
              window.location.reload()
           })
            console.log(res)
        })
        .catch((err)=>{
            Toast.fire({
                icon: 'error',
                title:  `${err.response.data.message}`
              })
            console.log(err)
        })
    })
}

const withdrawList = document.getElementById("withdrawList")

if (withdrawList) {
    let token = localStorage.getItem("token")
    axios({
        url:"/withdrawals",
        method:"get",
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    .then((res)=>{
        let items = res.data
        let htmlTemp =``
        items.map((item)=>{
            htmlTemp+=` <tr>
            <td>
              <div class="d-flex px-2 py-1">
                <div>
                  <img src="../assets/img/bitcoin.png" class="avatar avatar-sm me-3" alt="user2">
                </div>
                <div class="d-flex flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">BTC</h6>
                  <p class="text-xs text-secondary mb-0">BITCOIN NETWORK</p>
                </div>
              </div>
            </td>
            <td>
              <p class="text-xs font-weight-bold mb-0">$${item.amount}</p>
              <p class="text-xs text-secondary mb-0">Withdrawal</p>
            </td>
            <td class="align-middle text-center text-sm">
              <span class="badge badge-sm bg-gradient-${item.status!="approved"?"secondary":"success"}">${item.status}
              </span>
            </td>
            <td class="align-middle text-center">
              <span class="text-secondary text-xs font-weight-bold">${item.date.split("T")[0]}</span>
            </td>
          </tr>`
        })
        withdrawList.innerHTML=htmlTemp
    })
    .catch((err)=>{
        console.log(err)
    })
}

let updateForm = document.getElementById("updateForm")


if (updateForm) {
  axios({
    url:"/profile",
    method:"get",
    headers:{
      Authorization:`Bearer ${token}`
  }
  })
  .then((res)=>{
    let data = res.data
    updateForm.name.value=data.name
    updateForm.email.value=data.email
  })
  .catch((err)=>{
    console.log(err)
  })
  updateForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    let name = updateForm.name.value
    let email = updateForm.email.value
    // document.getElementById("profit").innerHTML="$" + formatMoney(data.profit)
       alert("kk")
        axios({
          url:"/update",
          method:"post",
          data:{name,email},
          headers:{
            Authorization:`Bearer ${token}`
        }
        })
        .then((res)=>{
           Toast.fire({
            icon: 'success',
            title: `${res.data.message}`
           })
           .then(()=>{
            window.location.reload()
           })
        })
        .catch((err)=>{
            Toast.fire({
                icon: 'error',
                title:  `${err.response.data.message}`
              })
            console.log(err)
        })
  })
}
const profileDetails = document.getElementById("profileDetails")


if (profileDetails) {
  let token = localStorage.getItem("token")
  axios({
    url:"/profile",
    method:"get",
    headers:{
      Authorization:`Bearer ${token}`
  }
  })
  .then((res)=>{
    // console.log(res.data)
    let data = res.data
    // updateForm.name.value=data.name
    // updateForm.email.value=data.email
    document.getElementById("fullname").innerHTML=data.name
    // document.getElementById("email").innerHTML=data.email
    document.getElementById("userId").innerHTML="ID:" +data.UserId
    
    // updateForm.name.value=data.name
    // updateForm.email.value=data.email

  })
  .catch((err)=>{
    console.log(err)
  })
}

const profileDetails2 = document.getElementById("profileDetails2")


if (profileDetails2) {
  let token = localStorage.getItem("token")
  axios({
    url:"/profile",
    method:"get",
    headers:{
      Authorization:`Bearer ${token}`
  }
  })
  .then((res)=>{
    let data = res.data
    document.getElementById("fullname").innerHTML=data.name
    document.getElementById("email").innerHTML=data.email
    document.getElementById("profit").innerHTML="$" + formatMoney(data.profit.toFixed(2))


  })
  .catch((err)=>{
    console.log(err)
  })
}

function pickPlan(plan) {
  let data
  
  let token = localStorage.getItem("token")

  Swal.fire({
    title: 'How much do you want to deposit?',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off',
      inputmode: 'numeric',
      placeholder: 'Enter amount, eg: 1000'
    },
    showCancelButton: true,
    confirmButtonText: 'Confirm',
    showLoaderOnConfirm: true,
    preConfirm: (amount) => {
      console.log(amount, plan)
      return axios({
        url:"/purchase",
        method:"post",
        data:{
          amount, plan
        },
        headers:{
          Authorization:`Bearer ${token}`
      }
      })
      .then((res)=>{
          console.log(res)
          Toast.fire({
            icon: 'success',
            title: `${res.data.message}`
           })
           .then(()=>{
            window.location.reload()
           })
      })
      .catch((err)=>{
        console.log(err)
        Toast.fire({
          icon: 'error',
          title:  `${err.response.data.message}`
        })
    })
    },
    allowOutsideClick: () => !Swal.isLoading()
  })
  console.log(plan) 
}


const activeInvestments = document.getElementById("activeInvestments")

if(activeInvestments){
  axios({
    method:"get",
    url:"/user-investments",
    headers:{
      Authorization:`Bearer ${token}`
  }
  })
  .then((res)=>{
    console.log(res)
    let items = res.data
        let htmlTemp =``
        let totalInvested = 0

        items.map((item)=>{
          totalInvested+=item.amount
            htmlTemp+=`<tr>
            <td>
              <div class="d-flex px-2 py-1">
                <div>
                  <img src="../assets/img/bitcoin.png" class="avatar avatar-sm me-3" alt="user2">
                </div>
                <div class="d-flex flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">BTC</h6>
                  <p class="text-xs text-secondary mb-0">BITCOIN NETWORK</p>
                </div>
              </div>
            </td>
            <td>
              <p class="text-xs font-weight-bold mb-0">$${item.amount}</p>
              <p class="text-xs text-secondary mb-0">Investment</p>
            </td>
            <td class="align-middle text-center text-sm">
              <span class="badge badge-sm bg-gradient-${item.status!=="running"?"secondary":"success"}">${item.status}
              </span>
            </td>
            <td class="align-middle text-center">
              <span class="text-secondary text-xs font-weight-bold">${item.date.split("T")[0]}</span>
            </td>
          </tr>`
        })
        document.getElementById("deposit").innerHTML="$" + formatMoney(totalInvested.toFixed(2))
        activeInvestments.innerHTML=htmlTemp
  })
  .catch((err)=>{
    console.log(err)
  })
}

const transactions = document.getElementById("transactions")



if (transactions) {
  let token = localStorage.getItem("token")
  axios({
      url:"/transactions",
      method:"get",
      headers:{
          Authorization:`Bearer ${token}`
      }
  })
  .then((res)=>{
    console.log(res)
      let items = res.data.transactionHistory
      let htmlTemp =``
      items.map((item)=>{
          htmlTemp+=`<tr>
          <td>
            <div class="d-flex px-2 py-1">
              <div>
                <img src="../assets/img/bitcoin.png" class="avatar avatar-sm me-3" alt="user2">
              </div>
              <div class="d-flex flex-column justify-content-center">
                <h6 class="mb-0 text-sm capitalize">${item.transactionType}</h6>
              </div>
            </div>
          </td>
          <td>
            <p class="text-xs font-weight-bold mb-0">$${item.amount}</p>
          </td>
          <td class="align-middle text-center text-sm">
            <span class="badge badge-sm bg-gradient-${item.status!="approved"?"secondary":"success"}">${item.status}
            </span>
          </td>
          <td class="align-middle text-center">
            <span class="text-secondary text-xs font-weight-bold">${item.date.split("T")[0]}</span>
          </td>
        </tr>`
      })
      document.getElementById("balance").innerHTML="$" + formatMoney(res.data.balance)
      document.getElementById("deposits").innerHTML="$" + formatMoney(res.data.totalDeposit)
      document.getElementById("withdraws").innerHTML="$" + formatMoney(res.data.totalWithdrawal)
      transactions.innerHTML=htmlTemp
  })
  .catch((err)=>{
      console.log(err)
  })
}



function copyToClipboard() {
      var textToCopy = document.getElementById("textToCopy");
      
      // Select the text in the input field
      textToCopy.select();
      textToCopy.setSelectionRange(0, 99999); // For mobile devices
      
      // Copy the selected text to the clipboard
      document.execCommand("copy");
      
      // Clear the selection
      window.getSelection().removeAllRanges();
      
      Toast.fire({icon:"success",title: `${textToCopy.value}`});
}
function copyToClipboard1() {
      var textToCopy = document.getElementById("textToCopy1");
      
      // Select the text in the input field
      textToCopy.select();
      textToCopy.setSelectionRange(0, 99999); // For mobile devices
      
      // Copy the selected text to the clipboard
      document.execCommand("copy");
      
      // Clear the selection
      window.getSelection().removeAllRanges();
      
      Toast.fire({icon:"success",title: `${textToCopy.value}`});
}
function copyToClipboard2() {
      var textToCopy = document.getElementById("textToCopy2");
      
      // Select the text in the input field
      textToCopy.select();
      textToCopy.setSelectionRange(0, 99999); // For mobile devices
      
      // Copy the selected text to the clipboard
      document.execCommand("copy");
      
      // Clear the selection
      window.getSelection().removeAllRanges();
      
      Toast.fire({icon:"success",title: `${textToCopy.value}`});
}
