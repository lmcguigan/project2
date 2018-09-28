$(document).ready(function () {
    //THIS FUNCTION IS NECESSARY TO CLOSE MODALS WITH THE X
    $(".close").click(function () {
        $(this).parents(".modal").css("display", "none");
    });

    var customer_id = localStorage.getItem("id");
    console.log("Home page 1 localStorage.id=" + customer_id);
    if (customer_id !== null && customer_id !== 'null' ) {
        console.log("Home page 2 localStorage.id=" + customer_id);
        $("#barloginbtn").text("log out");
        console.log("Home page 3 localStorage.name=" + localStorage.getItem("name"));
        $("#signedinas").text("Signed in as: " + localStorage.getItem("name"));
        $("#signedinas").css("display", "flex");
        $("#barregisterbtn").css("display", "none");
    } else {
        $("#barloginbtn").text("log in");
        $("#barregisterbtn").css("display", "flex");
    }

    $("#manage").click(function () {
        let customer_id = localStorage.getItem("id");
        console.log("manage click 1 customer_id=" + customer_id)
        if (customer_id === null || customer_id === 'null') {
            console.log("manage click 2a");
            $("#signinrequired").css("display", "block");
            $("#signinrequired").text();
            return false;
        }
        console.log("manage click 2b");
    });

    //Register btn click fct
    // $("#barregisterbtn").click(function() {
    //     $('#registerClose').on('click', function() {
    //         $('#registermodal').hide();
    //     });
    //
    $("#barregisterbtn").click(function () {
        let text = $("#barloginbtn").text();
        if(text === "log in"){
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
        $.post('/api/customers/register', customer, function (res) {
            if (res.success) {
                localStorage.setItem("id", res.user.id);
                localStorage.setItem("name", res.user.name);
                $("#signedinas").text("Signed in as: " + res.user.name);
                $("#signedinas").css("display", "flex");
                $("#signedinmsg").css("display", "flex")
                $("#registermodal").css("display", "none");
                $("#barloginbtn").text("log out");
                $("#barregisterbtn").css("display", "none");
                $('#nameregister').val('');
                $('#zipcoderegister').val('');
                $('#emailregister').val('');
                $('#pwregister').val('');
                $('#phoneregister').val('');
                $('#addressregister').val('');
            } else {
                $("#registerErrorMessage").text(res.message);
                $('#registerClose').on('click', function () {
                    $('#nameregister').val('');
                    $('#zipcoderegister').val('');
                    $('#emailregister').val('');
                    $('#pwregister').val('');
                    $('#phoneregister').val('');
                    $('#addressregister').val('');
                    //$('#registermodal').hide();
                    $("#registermodal").css("display", "none");
                })
            }
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
    // $("#barloginbtn").click(function() {
    //     $('#loginClose').on('click', function() {
    //         $('#loginmodal').hide();
    //     })
    $("#barloginbtn").click(function () {
        let text = $("#barloginbtn").text();
        if(text === "log in"){
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
            email: $('#emailinput').val().trim(),
            password: $('#pwinput').val().trim()
        }
        $.post('/api/customers/login', credentials, function (res) {
            if (res.success) {
                localStorage.setItem("id", res.user.id);
                localStorage.setItem("name", res.user.name);
                $("#barloginbtn").text('log out');
                $("#loginmodal").css("display", "none");
                $("#signedinas").text("Signed in as: " + res.user.name);
                $("#signedinas").css("display", "flex");
                $("#barregisterbtn").css("display", "none");
            }
            else {
                //console.log('res failed')
                $('#emailinput').val('');
                $('#pwinput').val('');
                $("#loginmodal").css("display", "none");
            }
        });

        // $.get('/reservations', function() {
        //     $('#emailinput').val('');
        //     $('#pwinput').val('');
        //     $("#loginmodal").hide();
        // }

    }

    function logOutCustomer() {
        $.get('/api/customers/logout', function () {
            localStorage.setItem("id", null);
            localStorage.setItem("name", null);
            $("#barloginbtn").text("log in");
            $("#signedinas").text('');
            $(location).attr('href', '/');
        })

    }
});