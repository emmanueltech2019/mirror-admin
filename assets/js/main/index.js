// const logout = Swal.mixin({
//     customClass: {
//       confirmButton: 'btn btn-success',
//       cancelButton: 'btn btn-danger'
//     },
//     buttonsStyling: false
//   })
  
//   swalWithBootstrapButtons.fire({
//     title: 'Are you sure you want to logout?',
//     icon: 'question',
//     showCancelButton: true,
//     confirmButtonText: 'Yes, Logout',
//     cancelButtonText: 'No, cancel!',
//     reverseButtons: true
//   }).then((result) => {
//     if (result.isConfirmed) {
//       swalWithBootstrapButtons.fire(
//         'Logging Out!',
//         'LogOut successful',
//         'success'
//       )
//     } else if (
//       /* Read more about handling dismissals below */
//       result.dismiss === Swal.DismissReason.cancel
//     ) {
//       swalWithBootstrapButtons.fire(
//         'Cancelled',
//         'Your are still loggedin :)',
//         'error'
//       )
//     }
// })


function logout(params) {
  Swal.fire({
    title: 'Are you sure you want to logout?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, logout'
  }).then((result) => {
    localStorage.clear()
    if (result.isConfirmed) {
      Swal.fire(
        'Success!',
        'See you next time!',
        'success'
      ).then(()=>{
        window.location.replace("/")
      })
    }
  })
}

