<script>

    // Sweet prices
    const sweetPrices = {
        "Gulab Jamun": 200,
        "Rasgulla": 220,
        "Kaju Katli": 500,
        "Jalebi": 180,
        "Laddu": 250,
        "Barfi": 300,
        "Rasmalai": 350,
        "Peda": 280,
        "Soan Papdi": 150,
        "Halwa": 200
    };

    // Search button functionality
    document.querySelector("form").addEventListener("submit", function(e) {
        e.preventDefault();

        let searchValue = document.getElementById("search").value;

        if(searchValue == ""){
            alert("Please enter sweet name to search!");
        }
        else{
            alert(searchValue + " is available in our shop.");
        }
    });

    // Order form
    const orderForm = document.querySelector("#fieldset form");
    const sweetSelect = document.querySelector("select");

    // Price display
    const priceText = document.createElement("p");
    priceText.style.fontSize = "18px";
    priceText.style.marginTop = "10px";
    priceText.style.color = "red";

    sweetSelect.after(priceText);

    sweetSelect.addEventListener("change", function() {

        let selectedSweet = sweetSelect.value;

        if(selectedSweet != ""){
            priceText.innerHTML =
            "Price : ₹" + sweetPrices[selectedSweet] + " per kg";
        }
        else{
            priceText.innerHTML = "";
        }
    });

    // Order submit validation
    orderForm.addEventListener("submit", function(e){

        e.preventDefault();

        let name = document.querySelector('input[name="name"]').value;
        let email = document.querySelector('input[name="email"]').value;
        let quantity = document.querySelector('input[name="Quantity"]').value;
        let address = document.querySelector('textarea').value;
        let sweet = sweetSelect.value;

        if(name == "" || email == "" || quantity == "" || address == "" || sweet == ""){
            alert("Please fill all details!");
        }
        else{
            alert(
                "Order Placed Successfully!\n\n" +
                "Name: " + name +
                "\nSweet: " + sweet +
                "\nQuantity: " + quantity + " kg"
            );

            orderForm.reset();
            priceText.innerHTML = "";
        }

    });

</script>