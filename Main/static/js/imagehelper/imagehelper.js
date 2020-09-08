var ImageHelper = function () {
    var handleUploadImage = function () {
        var image = $('#imageFileInput')[0].files[0]
        if (ImageHelper.IsValidImage(image)) {
            var data = new FormData();
            data.append('Image', image)
            data.append('csrfmiddlewaretoken', $('input[name=csrfmiddlewaretoken]').val())

            $.ajax({
                url: '/Main/ProceedImage',
                type: 'POST',
                data: data,
                contentType: 'multipart/form-data',
                processData: false,
                contentType: false,
                success: function (data) {
                    if($.trim(data.Text) !=""){
                        $("#extractedText").html(data.Text)
                        App.Toast("Text extracted from image successfully")
                    }
                    else{
                        $("#extractedText").html("<span style='color:red;'>No text can be extracted</span>");
                        App.Toast("Failed to extracted Text from image!", "error")
                    }
                    ImageHelper.ResetImages();
                },
                error: function (data) {
                    ImageHelper.ResetImages();
                    App.Toast("Something went wrong!", "error")
                }
            });
        }
        else {
            App.Toast("Please select a valid image!", "error")
        }



    };
    var handleProceedImageUrl = function(){
        var url = $("#imageURLInput").val();
        $("#extractResultDiv").addClass("d-none");
        if(url=="" || url == null){
            App.Toast("Please enter a valid image url!", "error")
        }
        else{
            var data = new FormData();
            data.append('ImageUrl', url)
            data.append('csrfmiddlewaretoken', $('input[name=csrfmiddlewaretoken]').val())
            $.ajax({
                url: '/Main/ProceedImageUrl',
                type: 'POST',
                data: data,
                contentType: 'multipart/form-data',
                processData: false,
                contentType: false,
                success: function (data) {
                    if(data.status== true){
                        if($.trim(data.Text) !=""){
                            $("#extractResultDiv").removeClass("d-none");
                            $('#selectedImage').attr('src', url);
                            $("#extractedText").html(data.Text)
                            App.Toast("Text extracted from image successfully")
                        }
                        else{
                            $("#extractedText").html("<span style='color:red;'>No text can be extracted</span>");
                            App.Toast("Failed to extracted Text from image!", "error")
                        }
                    }
                    else{
                        App.Toast("Something went wrong!", "error")
                    }
                },
                error: function (data) {
                    debugger
                    App.Toast("Something went wrong!", "error")
                }
            });
        }
    };
    var handleResetImages = function () {
        $('#imageFileInput').val(null);
    };
    var handleResetImageForm = function(type){
        if(type==1){
            $('#imageFileInput').val(null);
        }
        else{
            $('#imageURLInput').val(null);
        }
        $("#extractResultDiv").addClass("d-none");
        $("#selecedImageName").text("");
        $("#extractedText").html("Extracted text will be here after proceed.")
        $('#selectedImage').attr('src', "");
    };
    var handleIsValidImage = function (image) {
        var isValid = true;
        if (image == undefined || image == null) {
            isValid = false;
        }
        else {
            var fileType = image.type;
            var validImageTypes = ["image/gif", "image/jpeg", "image/png"];
            if ($.inArray(fileType, validImageTypes) < 0) {
                isValid = false;
            }
        }
        return isValid;
    };
    var handleChangeImage = function(that){
        $("#extractResultDiv").addClass("d-none");
        $("#selecedImageName").text("");
        var image = $(that)[0].files[0]
        if (ImageHelper.IsValidImage(image)) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#selectedImage').attr('src', e.target.result);
            }
            reader.readAsDataURL(image);
            $("#selecedImageName").text(image.name);
            $("#extractResultDiv").removeClass("d-none");
        }
    };
    return {
        UploadImage: function () {
            handleUploadImage();
        },
        ProceedImageUrl: function(){
            handleProceedImageUrl();
        },
        ResetImages: function () {
            handleResetImages();
        },
        ResetImageForm: function (type) {
            handleResetImageForm(type);
        },
        IsValidImage: function (image) {
            return handleIsValidImage(image);
        },
        ChangeImage: function(that){
            handleChangeImage(that);
        }
    }
}();