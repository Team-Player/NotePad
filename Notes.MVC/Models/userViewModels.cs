using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Notes.MVC.Models
{
    // Модели, возвращаемые действиями AccountController.
    public class LoginViewModel
    {
        [Required(ErrorMessageResourceType = typeof(MUI.dictionary), ErrorMessageResourceName = "ModelUserNameRequired")]
        [Display(Name = "ModelUserNameDisplay", ResourceType = typeof(MUI.dictionary))]
        [EmailAddress(ErrorMessageResourceType = typeof(MUI.dictionary), ErrorMessageResourceName = "ModelEmailWrong")]
        public string UserName { get; set; }

        [Required(ErrorMessageResourceType = typeof(MUI.dictionary), ErrorMessageResourceName = "ModelPasswordRequired")]
        [DataType(DataType.Password, ErrorMessageResourceType = typeof(MUI.dictionary), ErrorMessageResourceName = "ModelPasswordWrong")]
        [Display(Name = "ModelPasswordDisplay", ResourceType = typeof(MUI.dictionary))]
        public string Password { get; set; }

        [Display(Name = "ModelRememberMeDisplay", ResourceType = typeof(MUI.dictionary))]
        public bool RememberMe { get; set; }
    }
}
