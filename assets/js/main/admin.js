axios.defaults.baseURL='https://mirror.chop-life.com/api/v1/admin/';
// axios.defaults.baseURL = "http://localhost:4000/api/v1/admin/";

let token = localStorage.getItem("AdminToken");

function formatMoney(number) {
  // Convert the number to a string
  const numberString = number.toString();

  // Split the number into whole and decimal parts (if any)
  const parts = numberString.split(".");
  let wholePart = parts[0];
  const decimalPart = parts[1] || "";

  // Add commas to the whole part
  let formattedNumber = "";
  while (wholePart.length > 3) {
    formattedNumber = "," + wholePart.slice(-3) + formattedNumber;
    wholePart = wholePart.slice(0, wholePart.length - 3);
  }
  formattedNumber = wholePart + formattedNumber;

  // Combine the whole and decimal parts (if any)
  if (decimalPart) {
    formattedNumber += "." + decimalPart;
  }

  return formattedNumber;
}

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
const SignInForm = document.getElementById("SignInForm");

if (SignInForm) {
  SignInForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let email = SignInForm.email.value;
    let password = SignInForm.password.value;

    axios
      .post(`/login`, { email, password })
      .then((res) => {
        localStorage.setItem("AdminToken", res.data.token);
        Toast.fire({
          icon: "success",
          title: `${res.data.message}`,
        }).then(() => {
          window.location.replace("../dashboard.html");
        });
        console.log(res);
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: `${err.response.data.message}`,
        });
        console.log(err);
      });
  });
}

const depositsList = document.getElementById("depositsList");

if (depositsList) {
  axios({
    url: "/deposits",
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      let items = res.data;
      let htmlTemp = ``;
      items.map((item) => {
        htmlTemp += ` <tr>
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
              <p class="text-xs text-secondary mb-0">Deposit</p>
            </td>
            <td class="align-middle text-center text-sm">
              <span class="badge badge-sm bg-gradient-${
                item.status != "approved" ? "secondary" : "success"
              }">${item.status}
              </span>
            </td>
            <td class="align-middle text-center">
              <span class="text-secondary text-xs font-weight-bold">${
                item.date.split("T")[0]
              }</span>
            </td>
            <td class="align-middle text-center text-sm">
              <span class="badge badge-sm bg-gradient-success" onclick='approveDeposit(${JSON.stringify(
                item._id
              )}, ${JSON.stringify(item.userId)})'>Approve Deposit
              </span>
            </td>
          </tr>`;
      });
      // console.log(htmlTemp, content)
      depositsList.innerHTML = htmlTemp;
      // console.log(res)
    })
    .catch((err) => {
      console.log(err);
    });
}

const withdrawList = document.getElementById("withdrawList");

if (withdrawList) {
  axios({
    url: "/withdrawals",
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      let items = res.data;
      let htmlTemp = ``;
      items.map((item) => {
        htmlTemp += ` <tr>
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
              <span class="badge badge-sm bg-gradient-${
                item.status != "approved" ? "secondary" : "success"
              }">${item.status}
              </span>
            </td>
            <td class="align-middle text-center">
              <span class="text-secondary text-xs font-weight-bold">${
                item.date.split("T")[0]
              }</span>
            </td>
          </tr>`;
      });
      withdrawList.innerHTML = htmlTemp;
    })
    .catch((err) => {
      console.log(err);
    });
}

function approveDeposit(id, userId) {
  console.log(id, userId);
  axios({
    url: "/deposit/approve",
    method: "post",
    data: {
      userId,
      depositId: id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      console.log(res);
      Toast.fire({
        icon: "success",
        title: `${res.data.message}`,
      }).then(() => {
        window.location.reload();
      });
    })
    .catch((err) => {
      Toast.fire({
        icon: "error",
        title: `${err.response.data.message}`,
      });
      console.log(err);
    });
}


function approveEmail(userId) {
  Swal.fire({
    title: "Are you sure you want to approve?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Update",
  }).then((result) => {
    if (result.isConfirmed) {
      axios({
        url: `/approve-user-email/${userId}`,
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          console.log(res);
          Toast.fire({
            icon: "success",
            title: `Approved`,
          }).then(() => {
            window.location.reload();
          });
        })
        .catch((err) => {
          Toast.fire({
            icon: "error",
            title: `${err.response.data.message}`,
          });
          console.log(err);
        });
    }else {
      console.log("hmmmm")
    }
  });
  
}
function approveWithdrawal2(userId) {
  Swal.fire({
    title: "Are you sure you want to update withdraw status?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Update",
  }).then((result) => {
    if (result.isConfirmed) {
      axios({
        url: `/approve-user-withdraw/${userId}`,
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          console.log(res);
          Toast.fire({
            icon: "success",
            title: `Approved`,
          }).then(() => {
            window.location.reload();
          });
        })
        .catch((err) => {
          Toast.fire({
            icon: "error",
            title: `${err.response.data.message}`,
          });
          console.log(err);
        });
    }else {
      console.log("hmmmm")
    }
  });
  
}
// document.getElementById("ueb").addEventListener("click",(e)=>{

// })
function deleteUser(userId) {
  Swal.fire({
    title: "Are you sure you want to delete?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Delete",
  }).then((result) => {
    if (result.isConfirmed) {
      axios({
        url: `/delete-user/${userId}`,
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          console.log(res);
          Toast.fire({
            icon: "success",
            title: `Deleted`,
          }).then(() => {
            window.location.reload();
          });
        })
        .catch((err) => {
          Toast.fire({
            icon: "error",
            title: `${err.response.data.message}`,
          });
          console.log(err);
        });
    }
  });
}

const userList = document.getElementById("userList");

if (userList) {
  axios({
    url: "/users",
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      let items = res.data;
      console.log("items", items);
      let htmlTemp = ``;
      items.map((item) => {
        htmlTemp += ` <tr>
            
            <td>
              <p class="text-xs font-weight-bold mb-0">${item.email}</p>
            </td>
            <td>
            <p class="text-xs font-weight-bold mb-0">${item.name}</p>
          </td>
          <td>
            <p class="text-xs font-weight-bold mb-0">${item.verified}</p>
          </td>
          
           
            <td class="align-middle text-center">
              <span class="text-secondary text-xs font-weight-bold">${
                item.UserId
              }</span>
            </td>
            <td class="align-middle text-center">
              <span class="text-secondary text-xs font-weight-bold">${
                item.balance
              }</span>
            </td>
            <td class="align-middle text-center text-sm">
            <a href='../user.html?id=${item._id}'>
            <span class="badge badge-sm bg-gradient-success">View User
            </span>
            </a>
          </td>
           <td class="align-middle text-center">
              <button class="text-secondary text-xs font-weight-bold" onclick='deleteUser(${JSON.stringify(
                item._id
              )}, ${JSON.stringify(item.userId)})'>Delete User</button>
            </td>
          </tr>`;
      });
      userList.innerHTML = htmlTemp;
    })
    .catch((err) => {
      console.log(err);
    });
}

let updateForm = document.getElementById("updateForm");
if (updateForm) {
  axios({
    url: "/profile",
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      let data = res.data;
      updateForm.name.value = data.name;
      updateForm.email.value = data.email;
      updateForm.password.value = data.password;
    })
    .catch((err) => {
      console.log(err);
    });
  updateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let name = updateForm.name.value;
    let email = updateForm.email.value;
    let password = updateForm.password.value;
    // document.getElementById("profit").innerHTML="$" + formatMoney(data.profit)
    //    alert("kk")
    axios({
      url: "/update",
      method: "post",
      data: { name, email, password },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        Toast.fire({
          icon: "success",
          title: `${res.data.message}`,
        }).then(() => {
          window.location.reload();
        });
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: `${err.response.data.message}`,
        });
        console.log(err);
      });
  });
}

let sumAll = document.getElementById("sumAll");
if (sumAll) {
  axios({
    url: "/sum",
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      let { totalDeposit, totalWithdrawal, users, transactionHistory } =
        res.data;
      document.getElementById("allUser").innerHTML = users;
      document.getElementById("totalWithdrawal").innerHTML =
        "$" + formatMoney(totalWithdrawal);
      document.getElementById("totalDepost").innerHTML =
        "$" + formatMoney(totalDeposit);
      let items = transactionHistory;
      let htmlTemp = ``;
      items.map((item) => {
        htmlTemp += `<tr>
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
          <span class="badge badge-sm bg-gradient-${
            item.status != "approved" ? "secondary" : "success"
          }">${item.status}
          </span>
        </td>
        <td class="align-middle text-center">
          <span class="text-secondary text-xs font-weight-bold">${
            item.date.split("T")[0]
          }</span>
        </td>
      </tr>`;
      });
      const transactions = document.getElementById("transactions");

      transactions.innerHTML = htmlTemp;

      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

let updateBalanceForm = document.getElementById("updateBalanceForm");

function approveVerifcation(action, userId) {
  console.log(action, userId);
  axios({
    url: "/update-verification",
    method: "post",
    data: {
      userId,
      action,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      console.log(res);
      Toast.fire({
        icon: "success",
        title: `${res.data.message}`,
      }).then(() => {
        window.location.reload();
      });
    })
    .catch((err) => {
      Toast.fire({
        icon: "error",
        title: `${err.response.data.message}`,
      });
      console.log(err);
    });
}

const handleReply = async (messageId) => {
  let replyText = document.getElementById(`replyText-${messageId}`).value;
  console.log(replyText);
  try {
    const response = await axios({
      method: "POST",
      url: `/messages/${messageId}/reply`,
      data: { message: replyText },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
      },
    })
    getMessages()
  } catch (error) {
    console.error("Error sending reply:", error);
  }
};

function getMessages(params) {
  if (updateBalanceForm) {
    // Get the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
  
    // Get a specific parameter value
    const id = urlParams.get("id");
    if (id) {
      axios({
        url: `/profile/${id}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        console.log(res);
        let infoB = document.getElementById("infoB");
        let infoC = document.getElementById("infoC");
        let infoD = document.getElementById("infoD");
        let infoE = document.getElementById("infoE");
        updateBalanceForm.balance.value = res.data.userProfile.balance;
        infoB.innerHTML = `
        <ul class="list-group">
          <li class="list-group-item border-0 ps-0 pt-0 text-sm"><strong class="text-dark">Full Name:</strong> &nbsp; ${res.data.userProfile.name}</li>
          <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Email:</strong> &nbsp; ${res.data.userProfile.email}</li>
          <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Password:</strong> &nbsp; ${res.data.userProfile.password}</li>
          <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Balance:</strong> &nbsp; ${res.data.userProfile.balance}</li>
         <li class="list-group-item border-0 ps-0 pt-0 text-sm"><strong class="text-dark">Email Verifcation status</strong> &nbsp; ${res.data.userProfile.everified}</li>
         <li class="list-group-item border-0 ps-0 pt-0 text-sm"><strong class="text-dark">Withdrawal status</strong> &nbsp; ${res.data.userProfile?.withdrawStatus ==false?'Blocked':'Open to withdraw'}</li>
        </ul>`;
        infoE.innerHTML = `
        <button type="button" onclick='approveEmail(${JSON.stringify(res.data.userProfile._id)})' class="btn bg-gradient-dark w-100 my-4 mb-2">Update email status</button><br/>
        <button type="button" onclick='approveWithdrawal2(${JSON.stringify(res.data.userProfile._id)})' class="btn bg-gradient-dark w-100 my-4 mb-2">Update withdrawal status</button>
`
        if (res.data.userProfile.verified == "submitted") {
          infoC.innerHTML = `
          <div>
          <h4>Front View</h4>
          <img src='${
            res.data.userProfile.kycVerification.frontImageUrl
          }' style="width:100vw; height:100%;"/>
          </div>
          <div>
          <h4>Back View</h4>
          <img src='${res.data.userProfile.kycVerification.backImageUrl}'/>
          <span class="badge badge-sm bg-gradient-success" onclick='approveVerifcation(${JSON.stringify(
            "approved"
          )}, ${JSON.stringify(res.data.userProfile._id)})'>Approve 
                </span>
                <span class="badge badge-sm bg-gradient-warning" onclick='approveVerifcation(${JSON.stringify(
                  "declined"
                )}, ${JSON.stringify(res.data.userProfile._id)})'>Decline
                </span>
          </div>
         `;
        }
        if (res.data.userProfile.verified == "approved") {
          infoC.innerHTML = `<h4>Front View</h4>
          <h1 style="color:green">VERIFIED</h1>
          <img src='${res.data.userProfile.kycVerification.frontImageUrl}' style="width:100px; height:100px;"/>
          </div>
          <div>
          <h4>Back View</h4>
          <img src='${res.data.userProfile.kycVerification.backImageUrl}' style="width:100px; height:100px;"/>`;
        }
        let items = res.data.message;
  
        let htmlTemp = "";
  
        items.forEach((item) => {
          // Create the main message row
          htmlTemp += `
      <tr>
        <td>
          <p class="text-xs font-weight-bold mb-0">${item.title}</p>
        </td>
        <td>
          <p class="text-xs font-weight-bold mb-0">${item.message}</p>
        </td>
        <td>
          <p class="text-xs font-weight-bold mb-0">${
            item.reason
          }</p> 
        </td>
        <td class="align-middle text-center text-sm">
          <a class="badge badge-sm bg-gradient-success" href='mailto:${
            res.data.userProfile.email
          }'>Reply Via Email</a>
        </td>
      </tr>
    `;
  
          // Create reply rows (if any) nested within the message row
          if (item.replies && item.replies.length > 0) {
            htmlTemp += `
        <tr class="reply-row">
          <td colspan="4" class="reply-container">
      `;
  
            item.replies.forEach((reply) => {
              htmlTemp += `
          <div class="reply">
            <p><b>${reply.from}</b> - ${reply.message}</p>
          </div>
        `;
            });
            htmlTemp += `
          </td>
        </tr>
      `;
          }
          htmlTemp += `
        <tr>
    <td colspan="4">
      <div style='display: flex'>
        <input type="text" id='replyText-${item._id}' value='' />
        <button onclick='handleReply("${item._id}")'>Reply</button>
      </div>
    </td>
  </tr>
       `;
        });
        infoD.innerHTML = htmlTemp;
      });
      updateBalanceForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let balance = updateBalanceForm.balance.value;
        axios({
          url: `/balance`,
          method: "post",
          data: { balance, id },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(() => {
          Toast.fire({
            title: "Updates sucessfully",
            icon: "success",
          }).then(() => {
            window.location.reload();
          });
        });
      });
    } else {
      window.location.replace("../users.html");
    }
  }
}
getMessages()

const sendEmailForm = document.getElementById("sendEmailForm")
CKEDITOR.replace('message');

if(sendEmailForm){
  
  sendEmailForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    const messageContent = CKEDITOR.instances.message.getData();
const data = {
  email: sendEmailForm.email.value,
  subject: sendEmailForm.subject.value,
  message: messageContent,
  m: sendEmailForm.message.value,
}
console.log(data)
    axios({
            url:"/sentEmailtoemail",
            method:"post",
            data,
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        .then(()=>{
          Toast.fire({
            title: "Sent sucessfully",
            icon: "success",
          }).then(() => {
            window.location.reload();
          });
        })
        .catch(()=>{
          Toast.fire({
            title: "Error sending email, try again",
            icon: "error",
          }).then(() => {
          });
        })

  })
}
// const transactions = document.getElementById("transactions")

// if (transactions) {
//   let token = localStorage.getItem("token")
//   axios({
//       url:"/transactions",
//       method:"get",
//       headers:{
//           Authorization:`Bearer ${token}`
//       }
//   })
//   .then((res)=>{
//     console.log(res)
//       let items = res.data.transactionHistory
//       let htmlTemp =``
//       items.map((item)=>{
//           htmlTemp+=`<tr>
//           <td>
//             <div class="d-flex px-2 py-1">
//               <div>
//                 <img src="../assets/img/bitcoin.png" class="avatar avatar-sm me-3" alt="user2">
//               </div>
//               <div class="d-flex flex-column justify-content-center">
//                 <h6 class="mb-0 text-sm capitalize">${item.transactionType}</h6>
//               </div>
//             </div>
//           </td>
//           <td>
//             <p class="text-xs font-weight-bold mb-0">$${item.amount}</p>
//           </td>
//           <td class="align-middle text-center text-sm">
//             <span class="badge badge-sm bg-gradient-${item.status!="approved"?"secondary":"success"}">${item.status}
//             </span>
//           </td>
//           <td class="align-middle text-center">
//             <span class="text-secondary text-xs font-weight-bold">${item.date.split("T")[0]}</span>
//           </td>
//         </tr>`
//       })
//       document.getElementById("balance").innerHTML="$" + formatMoney(res.data.balance)
//       document.getElementById("deposits").innerHTML="$" + formatMoney(res.data.totalDeposit)
//       document.getElementById("withdraws").innerHTML="$" + formatMoney(res.data.totalWithdrawal)
//       transactions.innerHTML=htmlTemp
//   })
//   .catch((err)=>{
//       console.log(err)
//   })
// }
