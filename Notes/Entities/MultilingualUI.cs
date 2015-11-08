using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Web;

namespace Notes.Entities
{
    public class Languages
    {
        public string LangCultureName { get; set; }
        public string LangCurrencySpan { get; set; }
        public string LangFullName { get; set; }
        public string LangBadge { get; set; }
    }

    public class MultilingualUI
    {
        public static List<Languages> AvailableLanguages = new List<Languages>
        {
            new Languages {LangCultureName = "ru",  LangCurrencySpan = "fa fa-rub",     LangFullName = "Русский", LangBadge = "RU"  },
            new Languages {LangCultureName = "en",  LangCurrencySpan = "fa fa-usd",     LangFullName = "English", LangBadge = "EN"  },
            new Languages {LangCultureName = "tt",  LangCurrencySpan = "fa fa-bitcoin", LangFullName = "Татарча", LangBadge = "TT" }
        };

        public static bool IsLanguageAvailable(string lang)
        {
            return AvailableLanguages.Where(a => a.LangCultureName.Equals(lang)).FirstOrDefault() != null ? true : false;
        }

        public static string GetDefaultLanguage()
        {
            return AvailableLanguages[0].LangCultureName;
        }

        public void SetLanguage(string lang)
        {
            try
            {
                if (!IsLanguageAvailable(lang))
                    lang = GetDefaultLanguage();

                var cultureInfo = new CultureInfo(lang);
                Thread.CurrentThread.CurrentUICulture = cultureInfo;
                Thread.CurrentThread.CurrentCulture = cultureInfo;
                HttpCookie langCookie = new HttpCookie("UserLanguage", lang);
                langCookie.Expires = DateTime.Now.AddYears(1);
                HttpContext.Current.Response.Cookies.Add(langCookie);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public static Languages GetLanguage(string lang)
        {
            return AvailableLanguages.Where(a => a.LangCultureName.Equals(lang)).FirstOrDefault();
        }
    }
}