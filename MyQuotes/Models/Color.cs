using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyQuotes.Models
{
    public class Color
    {
        public static List<Color> GetColorList()
        {
            List<Color> color = new List<Color>()
            {
                //new Color { BackColor = "##fff", ForeColor = "#333", BorderColor = "#f5f5f5", key = "0" },
                new Color { BackColor = "#f85032", ForeColor = "#ffffff", BorderColor = "#d34930", key = "1" },
                new Color { BackColor = "#00d2ff", ForeColor = "#ffffff", BorderColor = "#11a2bf", key = "2" },
                new Color { BackColor = "#ffb347", ForeColor = "#ffffff", BorderColor = "#c49048", key = "3" },
                new Color { BackColor = "#666600", ForeColor = "#ffffff", BorderColor = "#2d2d06", key = "4" },
                 new Color { BackColor = "#FDFC47", ForeColor = "#ffffff", BorderColor = "#bfbd41", key = "5" },
                  new Color { BackColor = "#614385", ForeColor = "#ffffff", BorderColor = "#3f2c56", key = "6" },
                  new Color { BackColor = "#DD5E89", ForeColor = "#ffffff", BorderColor = "#99415e", key = "7" }
        };

            return color;
        }

        public string BackColor { get; set; }
        public string ForeColor { get; set; }
        public string BorderColor { get; set; }

        public string key { get; set; }
    }
}