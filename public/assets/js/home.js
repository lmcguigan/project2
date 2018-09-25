$(document).ready(function() {
    var loggedin = false;

    //Register btn click fct
    $("#barregisterbtn").click(function() {
        $('#registerClose').on('click', function() {
            $('#registermodal').hide();
        });
        if (loggedin === false) {
            $("#registermodal").css("display", "block");
            $('#submitregisterbtn').on('click', createNewCustomer);
        }
    });

    function createNewCustomer(event) {
        event.preventDefault();
        var customer = {
            name: $('#nameregister').val().trim(),
            zipcode: $('#zipcoderegister').val().trim(),
            email: $('#emailregister').val().trim(),
            password: $('#pwregister').val().trim(),
            phone: $('#phoneregister').val().trim(),
            address: $('#addressregister').val().trim()
        }
        $.post('/api/customers/register', customer, function(res) {            
            if (res.success) {
                loggedin = true;
                $("#registermodal").css("display", "none");
                $("#barloginbtn").text("log out");
                $("#barregisterbtn").css("display", "none");    
                $('#nameregister').val('');
                $('#zipcoderegister').val('');
                $('#emailregister').val('');
                $('#pwregister').val('');
                $('#phoneregister').val('');
                $('#addressregister').val('');
                $('#registermodal').hide();
            } else {
                $("#registerErrorMessage").text(res.message);
                $('#registerClose').on('click', function() {
                    $('#nameregister').val('');
                    $('#zipcoderegister').val('');
                    $('#emailregister').val('');
                    $('#pwregister').val('');
                    $('#phoneregister').val('');
                    $('#addressregister').val('');
                    $('#registermodal').hide();
                })
            }
            console.log(loggedin);
        });
    }
    //  function getCustomer() {
    //     $.get("/register", function(data) {
    //         // var customer = [];
    //         // customer = data;
    //         console.log(data);
    //         //$("#signedinas").css("display", "flex");
    //        // $("#signedinas").text("signed in as: " + customer.email);
    //     });
    // }

    //Login btn click fct
    //
    $("#barloginbtn").click(function() {
        $('#loginClose').on('click', function() {
            $('#loginmodal').hide();
        })
        if (loggedin === false) {
            $("#loginmodal").css("display", "block");
            $('#submitloginbtn').on('click', loginInCustomer);
        }
        else {
            //need code here to log user out
            logOutCustomer();
        }
    });

    function loginInCustomer(event) {
        event.preventDefault();
        var credentials = {
            email:$('#emailinput').val().trim(),
            password:$('#pwinput').val().trim()
        }
        $.post('/api/customers/login', credentials, function(res) {
            if(res.success) {
                loggedin = true;
                console.log('test ' + res);
                $("#barloginbtn").text('log out');
                $("#loginmodal").css("display", "none");
                $("#signedinas").text("Signed in as: " + res.email);
                $("#signedinas").css("display", "flex");
            } else {
                console.log('res failed')
                $('#emailinput').val('');
                $('#pwinput').val('');
                $("#loginmodal").hide();
            }
        });

        // $.get('/reservations', function() {
        //     $('#emailinput').val('');
        //     $('#pwinput').val('');
        //     $("#loginmodal").hide();
        // }
        
    }

    function logOutCustomer() {
        $.get('/api/customers/logout', function() {
            $("#barloginbtn").text("log in");
            loggedin = false;
        })       
    }
})

   