using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Notes.Auth.Models
{
    public class UserRegisterModel
    {
        [Required(ErrorMessageResourceType = typeof(MUI.dictionary), ErrorMessageResourceName = "ModelUserNameRequired")]
        [Display(Name = "ModelUserNameDisplay", ResourceType = typeof(MUI.dictionary))]
        [EmailAddress(ErrorMessageResourceType = typeof(MUI.dictionary), ErrorMessageResourceName = "ModelEmailWrong")]
        public string Login { get; set; }

        [Required(ErrorMessageResourceType = typeof(MUI.dictionary), ErrorMessageResourceName = "ModelPasswordRequired")]
        [DataType(DataType.Password, ErrorMessageResourceType = typeof(MUI.dictionary), ErrorMessageResourceName = "ModelPasswordWrong")]
        [Display(Name = "ModelPasswordDisplay", ResourceType = typeof(MUI.dictionary))]
        public string Password { get; set; }

        [Required(ErrorMessageResourceType = typeof(MUI.dictionary), ErrorMessageResourceName = "ModelPasswordRequired")]
        [DataType(DataType.Password, ErrorMessageResourceType = typeof(MUI.dictionary), ErrorMessageResourceName = "ModelPasswordWrong")]
        [Display(Name = "ModelConfirmPasswordDisplay", ResourceType = typeof(MUI.dictionary))]
        [Compare("Password", ErrorMessageResourceType = typeof(MUI.dictionary), ErrorMessageResourceName = "ModelPasswordConfirm")]
        public string ConfirmPassword { get; set; }        
    }

    public class UserLoginModel
    {
        [Required(ErrorMessageResourceType = typeof(MUI.dictionary), ErrorMessageResourceName = "ModelUserNameRequired")]
        [Display(Name = "ModelUserNameDisplay", ResourceType = typeof(MUI.dictionary))]
        [EmailAddress(ErrorMessageResourceType = typeof(MUI.dictionary), ErrorMessageResourceName = "ModelEmailWrong")]
        public string LogIn { get; set; }

        [Required(ErrorMessageResourceType = typeof(MUI.dictionary), ErrorMessageResourceName = "ModelPasswordRequired")]
        [DataType(DataType.Password, ErrorMessageResourceType = typeof(MUI.dictionary), ErrorMessageResourceName = "ModelPasswordWrong")]
        [Display(Name = "ModelPasswordDisplay", ResourceType = typeof(MUI.dictionary))]
        public string PassWord { get; set; }

        [Display(Name = "ModelRememberMeDisplay", ResourceType = typeof(MUI.dictionary))]
        public bool RememberMe { get; set; }
    }
}