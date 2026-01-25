import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col selection:bg-gray-200 selection:text-black">

      <main className="flex-grow">
        
        {/* --- 1. HERO SECTION --- */}
        <section className="w-full bg-[#FAFAFA] pt-10 md:pt-0 min-h-[600px] md:h-[80vh] flex items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[55%] h-full bg-[#F3F3F3] skew-x-12 translate-x-20 z-0 hidden md:block"></div>

          <div className="max-w-7xl mx-auto px-4 md:px-8 w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
            
            <div className="space-y-6 md:space-y-8 animate-in slide-in-from-bottom-10 duration-1000 fade-in order-2 md:order-1 pb-10 md:pb-0">
              <div className="inline-flex items-center gap-3">
                 <div className="h-[1px] w-12 bg-gray-400"></div>
                 <span className="text-gray-500 text-xs font-bold tracking-[0.2em] uppercase">Est. 2026</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-gray-900 leading-[1.15]">
                Vision <br />
                <span className="italic font-light text-gray-400">Crafted.</span>
              </h1>
              
              <p className="text-base md:text-lg text-gray-600 max-w-md font-light leading-relaxed">
                Sự cân bằng hoàn hảo giữa kỹ thuật thủ công và công nghệ quang học hiện đại. Nhẹ nhàng, bền bỉ và tinh tế.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                {/* Updated Button Radius */}
                <Button className="h-12 md:h-14 px-8 md:px-10 bg-gray-900 hover:bg-black text-white rounded-[15px] transition-all duration-300 shadow-lg hover:shadow-xl text-xs md:text-sm font-bold tracking-widest uppercase">
                  Shop Collection
                </Button>
                <Button variant="ghost" className="h-12 md:h-14 px-6 md:px-8 text-gray-900 hover:bg-gray-100 rounded-[15px] text-xs md:text-sm font-bold tracking-widest uppercase border-b border-gray-900 hover:border-transparent transition-all">
                  Book Exam
                </Button>
              </div>
            </div>

            <div className="relative h-[400px] md:h-full w-full order-1 md:order-2">
              {/* Updated Image Radius */}
              <img 
                src="https://matkinhlb.com.vn/wp-content/uploads/2022/09/2-2.webp" 
                alt="Hero Eyewear Model" 
                className="w-full h-full object-cover object-top md:object-center rounded-[15px]"
              />
            </div>
          </div>
        </section>
        {/* --- NEW SECTION: AUDIENCE CATEGORIES --- */}
<section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
  <div className="flex justify-between items-end mb-8">
    <h2 className="text-2xl font-serif text-gray-900 tracking-tight">Browse by Category</h2>
    <a href="#" className="text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400 hover:text-gray-900 transition-colors flex items-center gap-1">
      View All Categories <ArrowUpRight className="w-3 h-3" />
    </a>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {[
      { 
        name: 'Men', 
        img: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMWFhUXGRsXGBUYGBUXFhgZGxcaGBoYGhcYHSggGholHRgYIzEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGi0lHx8tLS0tKysrLi0tLS0tLS0tLS0tKy4tNS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKy0tLf/AABEIAPYAzQMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAABQQGAgMHAQj/xABJEAABAwIDBAcFBgQBCQkAAAABAAIRAyEEEjEFQVFhBhMicYGRoQcyscHwI0JSgtHhFGJy8ZIVJDM0U1STwsNDY3SElKOys+P/xAAZAQEAAwEBAAAAAAAAAAAAAAAAAQIDBAX/xAAiEQEBAQACAwABBQEAAAAAAAAAAQIRIQMSMfAEEyJBUWH/2gAMAwEAAhEDEQA/AO0IQhAIQhAIQhAIQhAIQhAIS/au2aWHydaYD80G0Q0STcid2k6pEPaNgJcHVHNyzdzHDNDspieB4xo78JgLahUrG+07AtpdZTf1jjEU4ewwbkk5CBF+82UQe0yi0Pe6H0wYZ1c9Y6WhwBYTI0dcxeNdUHQELmeO9rtABvU03OeWPLg7shjmiwIEk3gm9gRoStOwfa3S6r/OWw5pLeyZe4iJOXc3tRJM9k+8UHUkJBsfpC+synUOHysfEvbWovbTMT27ghpBbBEmSZa2xL4OCD1CEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBL9t7SFCnmsXGcrMwaXQ0uOWdSACYF7WWjpFt+lhWfaPDHPB6suDnNzaNzBt8skeAPBcE6a7fxFSsWPxbazAczXsLupByk9gZQMzZIkX5yieEuv7R6zg2adEOvbITTa5ziXOZDs3az31iyre2tsvxDw5+UHKGzTYxrSBmIJDDE31ifJLnVdDABsQLaGTrF9RpHurTWvAkjcBoLbwN/fzQ5ZOqkjWSBxGunj87rZSxPZv72+w7WupN7X8TyUcU72J491+/uQ5undy8vT15ohINSBMwecb92mlvrfjTsZnS+YGD/AG3yLzxso/V3gG26OZ1Wc93ziZOvcgsWxelGJoOBp13tGbMWlxc3MQYJa6WzruvJmYCvfQn2iNY9jMU9wYJ7bRaSDeo0S60ADLYRpEZeRtZaRB3TeD3T4jvCGVNbEnmJG654+KJ5fWuy9rUcQ0Po1GvBE2seF2m4uCPBTVwToJ08fg4Y+k6owgBxbkYG3Jzb853ScskxwXY9g9IqWKZmp5jFjDSQDYxnbLZhzTEzfiCAQcIQhAIQhAIQhAIQhAIQhAIQhAJT0l2m3D0TUeXhoBnI0veeyQA0QRMxrbjYFNlyL2wdLBfBjNlBaXkHKSQTmY5pF2wWmZFyNUHNtsbQdUquqVM0kz2jckkuALtDGlhuFhCRVMUDJtrvBMiOZ17+K34l5IBmZuN3z4/HneOas8B9b2ifgibWPWZhMACY+uPfHDkhoi1/GPKYjVGbdu9LWgqZhsA98RF/7Tpb64qLZPpJb8QSSLcdeY+o5IgixMDXwPwTZuxa34fjf6+t68/yJWE/ZnQk8IF928wVHvn/AFb9vX+F8utG+LWsPD6+K9ocZsL7r30i97jz5qVV2ZW/2ZvoI/Vaa2Eqts9rhu0i3DxU8xX1rQyleYAJixuAPqAt5bbvtvg7+d+SjuqEA6iZE755fBYsJ0cRl7wYE8LqUJTHabv6pEaz9Fdh9ie3arnPwzu1TDc4PZBadORcT2e4M7lx0PzAABtrAkX1mTxP6qTg8Y+m5r2OAe0ggzoQZ7zp9QES+tkKl+y3aj6+GLqlY1qgIa49vq25fdDQ9rblpaSYMnfuV0RAQhCAQhCAQhCAQhCAQhCAXzp7X69J2NquaH582V7X5eyWdgOaBo1zAHDfc2BX0WvnD2y4NrNoPc3PLjndnyTJgdkg5jT7PZzAReLIKFB0Fu9ZNpT4bvX68Vud3c9VnRpA7uQP13FOeCTkMaJ47jqfieEq2bDZDAB9SZ3696r9LDCJjTeJ7Nzx1srHskWE/wBuS5/LrmOz9Pji8ndBic4KgEuw7dCnWBaIWEdd6YVcK3eJS7aOHaQQW667p74TeuYSzGvRE4qkbQ2AySWEiZtwPJVzF4N9M3H5hvHHvV7xSWYpmYQQtceXU+sPJ4M2dKYGu1mR3/ULeys3Q+J+u9ZbQwZY7skwVopsjceei6ZeXDZxeK7x7ExWdhy4VB1YqEOYbkjJZw/D2teMbov1BcZ9hb6oqVBbq3NhwlxMiSx0TlaBDhJEnML2XZlJQhCEQEIQgEIQgEIQgEIQgFxX260afWse9jm1SwCnUaQWVWNcM7H2BZUaXkiCQROhhdqVA9seIjDUqYpte91TM3M0HKGtgkEjskl4vwlRbxOVsZurxHz85l54/X6KdgqIJteJ/We/9E22rs1jmZizq6zfeZFiOIBsZ1mEowoeLtcRbT7u7dosveaja+O41xTUMFhLWzYFzmMbMT7zyGjTeU1wdB7W52sNW3/ZfaD/ABU5b6qpbSqOdTIcJIIy98gfCVsoOo0gAWMJH3i1pJPGXadyr6Zs5aTy6l46XfDbaYCA9rmd4tzEg2I3yrVs2pTeyWPa8aHKQSDE3Hl5rk1bGUntLspsQ0uEhoJEgFzHRMB0A/hPArXSxESWuIMR2u+R22iRv1addU/bkP3tf261WeCbJdimqsdHdunP1b33mzXkZiDpldMOvOnd3PK+0G6z9arHUsvboxqanMLMU0pbVC3YjbNPNefC/otFXG0jYPAPA2PiCkzr/C7zf7LNpNndKhbM2W+s9tJgJLj7ozE7tzQSfBTMcCRO4W9PrzXc/ZR0b/hcK2s4u6zEND3NIAyDc0WzczPLhJ68TpweW86NOg3RduAwzaZDDVN6j2g3P4Q43LRunvVjQhXZBCEIBCEIBCEIBCEIBCEIBUP2lUc1Sh/KyoTzh1KB5keSvioPtVa5ooVh7o6xjhuObIW+Iykj+krPzTnFb/prx5Jy5vt3B1S7O4Brco1EOjMYPofVIcNSAAVg6R7TLg4FwNqYDhN4kaHSAQI5JLhbrmx1l2eTi7aMfhx2Ob2D1TLB9HWuptJZm73fJadpYcup21BDgdwIMieVvVWzZe0abqdMO+ydAAa6zSf5Knuv00BniAry256U9ZNdqzX2JQJBNCHBwPZLodpIcN4Mbo1PFYt6PNc4kdgEmRcNbNwG621F3cLazeatM/QSPbtTIxzzJyiAP5joAN5J3alR76+Lft4ndUDaezH9bTpUQX1DJAbqNPLSeUKBiKuIY9zXvqBxJJzOde8kmdZ4ro3Q7BFrn1agHWvBn+UbmD5xqe5Vbbzc2LaD/MJ9Vpnyd+rDfh69vlpbhaQLHPNU9kgHvMwJ0kwbHgVIZhWO96q7xa13kOz6FMcTsqnHapidc7S6/wDVJPpCWvwzmvke6TMQQB3clb35+KXx2fYtXQ/ZpFWnUax2MoYd3XVaVJjhWAAOXsP7LwHQcrXkm9rW7b0c6YYPHf6vXa54Emm6WVQNCcjrkCRcSL6qieyvYbauFr9eSKDsmYNfUpkvbme4ucwgloYadjI10vMz2NdGqTKb9o5SH13VOqzE9igX2sdXOLfeN4A4mdJ8Ya+umIQhSgIQhAIQhAIQhAIQhAIQhAKLtPZ9PEUnUaoljhB4jg4HcQbhSkIOCe0XZNXDupsq9WSGCCyQCxpyg5YADrGQPVVujYSrt7aq2bFBv4aVMQObnvO/gR5KhYSvAjd8db+Meqx3nrp0+PffZ3hagsCmeMwtEMtmY534HFubvAs7xSLAEEg7pUypiWsqXBc6Bc6zEkAeOg4b1hI67qcdsqOwK2Q5K5ZYkBpLD/7TgJ71uwGHpuDXkue9os6o9zyJ1jMbc4iVNwu0Yu4ERxB5fqlW0dkUXFz2VXUnawC+LyZGXQa+RU83XXJJnHfCx08CSzOCI01VM29s8l4ey7mmY47iJ5glZDbL6TIfLhMZm745fslw6QS4nI7kd8937qJjUvMRvyY1OKf4BzXsBaZ4jQjkRqPFa9o0xFktw+zxUb1gcWPvcGNdbi48Fi1tbMKZLnEkNEGZJsB2gT6q0zOelNbvr3HU8E53+ScLgaFq+OztLh9yjnIrVncAKYDRzc2F0jBYRlKmylTGVlNrWNHBrQAB5BKOinRmlg6TQ1pNUsaKlRznPcSLlrS4nKzMSQ1sBPV1uC/QhCEQEIQgEIQgEIQgEIQgEIQgEIXoCD569qtfPtDE30cxov8AhpMaR5tKp9N0yB4+t7px0qxPW4mvVmQ+rUcO4vJb6QkJy5eyTpfcRzBv9d6p9a3+NOtj1CSR4jly+uKeYfBMrZ8zZsP5XCOBHume/wAVVKbiCS2bi8bjN/Qeqt3RYgMIJgm5489dTunfHJY6nHboxrnjJtsbou57HnD4txc1rMtOoBOe4e1xEdkkAgj8UFNn7ExgNSnUw1Ou1rQetblh07hmgyDNu5IBX6qoHXiZ7oM/urdhek1Sm3s1BUa6TL5c+TpfN+3IKJxe3TrG+P49/wDK59tXDUolzH0muNi4Oa2dwGYa20SOvhWNHYeCOBifMW+C61tLpK14b9ixwboXEi+WA6MpykePeuY9IMHRq1pY0NH4GSBGpJ/ESSb9wVoz3nXHOs8MNl1B1ZdO+I85Vk9mGBFfaDXOEikDU5AizSfEhU/aWIDBlaI1AbMxu8F1j2K9HH0qb8XVEGqA2nf7msx36HgVfOe+XJvydcOnIQhasAhCEAhCEAhCEAhCEAhCEAhC8JQepf0hx3UYWvW3spuI/qiGj/EQtlTaTGuc1xhzTBHw8xC597VOkrHUm4Wk6c8PqEcAey3xIn8reKrdRbOba5W+iMscAklZmV1xafVWjq7Jbj8Nv8wsc67dXk8fMLeuggbr31/FbnNtQrV0SrCcmXtRNr2Fve0jT1VPfTy2nx0t38I3c+9TNmbQDMs3IBAAgXNr8VrrPMc+Neuu3SalAOB3j4/sq1iX1aTiGE3vliWjjr8uKlbN2+GgBzpAGu8ui5n8NivcRtSi8iRe49BaeKw9bl2+81/ZVVx9VwufIH9VFq9hpLtXC2qm1KjAeSU4lxr1RTpAlziGtaDckkAAcDJ7vIq2JbWfm313eTToP0cfj8YKcjq2EOquMkdWDMajtO90cJJ3L6UoUWsa1jRDWgNaOAAgDyCr3QDoyMBhG0oHWHtVSCSC7lO4DhA1VkXQ4ghCEAhCEAhCEAhCEAhCEAhRcXjmsE+8eA/VLmbUe97W2a0uAtcxO8n5QoupEyWnRctYkmT4KQKa8exUuiOXe1xr6dek9pIbUpkEDeWOv6Pb5Lm5Jc6Tqu1+1HZnW4PrAJdRcH88h7LvC4d+RcXDYJWWnV4pzG9jVqxVGQpNJe1GrPl08dKriaJE/XkltSWmfkLKz4yldKcRQW2duXyeNFGKJN9SZnvtccPBbf4twvIECZt5D18Z71gMONVqqUwDZae0Y+ljdUxLiN8ONtPeAMk2/ERbhIXYfYj0XYGHHPh1SXU6Y1ygRLjuzE5gOAnWVxikBK6f7PNr1KTSGOIAtyte433JU8q2O4oSDZ3SVrh9o0tPEXHlr5SndCu14ljg4cQZ/srKtiEIQCEIQCEIQCEIQQ37RZmLWnMQNfujx3+C0Pql2p8N3klOzHduOII+fyTZoVOeVrOETaA7HiPgVAp2MjUX8RcJtimdg+fl+yWhV0vn4t1J4cARoQCO4r0hL9h1pp5d7DHhqPQx+VMSoZ3qtVSkHNc1wBa4EEHQgiCCuB9J9iuwuJfRMx7zHfiYScp79x5tK7/CQdMujbcZRgQKzJNNx9WE/hNu4gFV1OY18W/W9/HEGLPMtuNwrmEtcC1wJBBsQRYg81CL1i9BrxLZSrEUkzqPUSor5vDLU5J60qK4JrWaoNVi0lY2NdELofs7pE4dz+NR0eBhc5qWC7X0U2SaGEoU3DtFoc7vdc/FW5YbNsNR0WVZ76NSWkiRNjHePrimOFoLPbOG+zad4dHgR+wTlWfU/AbZJALhmHEWPlofRN6NdrxLTPxHeFVtkNs4cL/I/JMDSOoJBGhGv7jktJUWcU9QleD2sCctSzhadx7xu+CaAqeUcBCEIBCEIKjh3Q4Hgf7p8EjaE5wLszByt5ftCyy122lsiOIhJohP4lKMayHnnfz19ZU6Rit2xa2WrH4xH5m3Hpn9FYVUDUyw8atIdzMXI8RI8VbgVWI3OwQvFksXEASVPCqpdNeigxANakPtQO038YGn5h66cFyrE7NIJtcWI0IPAjcV1LbHTYXp4Km7EP06wSKDT/X9/ubbmFrLWYjKMVTAqEQKg7LvPQ34zvssrmW9OrxeW5nGvjj2IwpG5Qn0HcCr90m2C7DvAPaY73KgFncQeDhwSSrQHBZ22XiuuSanMVWpSUN1CVbX4MKDUwcbvLUq00zvjauhnR7+KxbGEdhhFR/MNcOz4kgd0rtrsPLu6yj9CuiDcLRl1q1QdtwOlrNG4hskXBuSd9omzaOLwbzQqluJpNH2dUlwxBbua5oaW1HCCJkE27lt8ji3fa9LHh6Ky2jRmk7lfyutGydsUK1mPh2nVvBp1OfYfBI5iRzTl1MRCM/is7Ms/vB/X5Jo5LKDctUDg6PWE1cFbKdfSradOCHcbeI+vReYLaT6e+RwOik7TbLPH9QlCi9Vadxa8FtJlS0w78JI9FNVIB8u6qR3ksDmtji5h8E12Ztogdo52Cxe0h+Xvc0m39QZyG5WmkXP+LEhY06gcA5pBBuCNCsldRVmNTDZp1HG/l9eiiMC3YV0Pafq9llG1+GrCoO1GaO8PmPmphWGNZLDyv5K1Zz6ThSNm9JaTQ3DvFQ1mjLkbTqPzBvuuzAZRLYNyLzwUZYvYCCHNa4HVrhLTGgNjZZtbJTbE7Urn/RU6TedarDh+Sm1wP8AjCW46i6qIxHVv4MDy9ljqW5WtO6JB71o/hmCxo7OHLNP/TC24egBdtPCNG80Xds8BGQTfmn0kkbabQAABHIWHktjm5m+4HxrIDrHXskXuBpe9p0OtSsC+HjnZTEa+IbOqrMdQc7NTdzzOpO4ZjeRqJveCuc7awDsPWdSfqNDucNzhyI+YXYauGa8QbHjvVc6Y7HNbDl0fa0JIP4mfeHkJHMRvKr5Mczlf9P5fXXF+VzZgVl6B7AFav1zh9nRNrWdU1A/KL95bzVepMmABJNgOJNgF1GpiqWzcG3NcgQ1o9+rUNzlG8kz3DXRZ+PPN5dP6nfrnifanY+vSwoq4qtVIGUCCTkY1sw1jB94knm4wNAAKfsna78UH1XiozMTlDW56jG/dIaAZcBciCJnckVXA4vaFUVsWctNpmnQB7LN35ncXH0Fha8DhAwANFTkKWUVPy57d/KVvy4ZOG81XER12NI/8MyPI0LrynWe33KtUf1sFM93VOYGgcw0E8V64O/2e0O/rKPwFX5LFxO8VRyrFhf5sJEePFVXr2k85gXHMc0k2EmZ0FgnsJArAr5Z7RNoN7DvD4hJHBPscOw763hJ8qaTj4i1HACSWjm59SkP+Iz3fGyK7yIc+QNz6ga5kfy4mhDqY/met0OHudZPGl1RcBxLalnN5a8FGaYHWN7IkzWoNIAcDcV8MZvxME/0Kq5hsnahpPh/uONxmD4PEOHvfMc1bGuBAIMg3B5Ln7h/T+UZW+A3DkrZ0aql1LKfuuIHcbj1nyWmay1C/DPBEtL3N3Oe0tc7+aCBrxgSsyo2DxDnT1lUPqD/AEjWgBtI65Ad8TvJOhtKlHis2hs10gHiAfms2qPhTLByn4rc0rRlSWtTgkcDCxAUraTYfPEA/L5KKs61lanVGNsXYJm/LUAD+8jMNeK8FemdH7OJF9QCDxBzEg81sq4osA+1o0x/3rC4EncCHtiw0utY2nxxmB/wf/uoWiW186EEbiLg9x3ozRB8lrpYhrtKtKod5o+6OAjM6DHNbDopVO6TwYI3hZVG2mJI15jgoOz6nZjgf3+aY0yCtPsZXpRdk9HgzaFSRFGh9qOBzCaY7hf/AIabYXZ/X1v4utcXFFh0YzjH4nWJ8BuTfaLJimNX2cd+QTbykfmXmIq5RpoLDuVc54W3u6vZJVu4gaSfijITYMe6fusf1bz3OzNjjqN68aIHNeOZmtkL/wCQOyT3OBEfsq1ePBg3f7rih/5wj/rrw0C2xp1Gb4qVTVceYcXOgW0nUE716dnG3+Zt/NiX/oVicMWa0W0p3NqGpPEyQIKjj8/Im38/K8IT2i7st7h8EiTnCO7De6PK3yV8s9jGe4e5KWhNcV7ju4pUz60TRhpxVKR7gfEmC803CAbscLh43XG+4UPDyWsrS45gCzFUSDnGrW12RBO7NBA4sJW/bFMOpPlrDDSZeYayx+0FtW67t9wtbqJDjmpCm8wXOpu+wqg6Oy65xA1EidSFVd5G9TMDtB1FzwODQf6gCT6uXmCpS4ToLnuH6mFGp3BcfvPefCYHwWmIy3UjZdZpEMrB9MOflBk1XS+X1HOJkhz5iGgEFsGITAlLsC+o4B76VNmYkhzXS43MNMNFmtganTQBTwVm2phs51iOfxH7KTKgbOPaI4ifX91PV58Za+ou0RYHmR5/2S/63ppixLDyg+v6SlajS2fgbVLbh+Ti7KXwP6d6wO0T/vjPHDPH/OFm2dxg8ba+NlgccZ/1uv8A+lt/9QVavPz84DMaHEA4ihUNwGsYWP4k3qOkQDaFtaVqdj5F8U5w/CcO4TykNt3rMoVLwNQB3I2/T65pqwwq8SnWFxEsB8/OFaVnqNVSuOsO8x6fQWrGWYTvMDwUzDhsE2j72luB+EKJtAdg8v1V71FM/SkleFma2QPn7jjla7kXQY8l6V49oNi1rhva73TydY2O+xssm7U/Zg34PAj+qpPxoIpUQ3Slhqc69Q4OJj8UMbpu11K9/hGN1o7OZzmf+QIYGTY4OTuoQKh8jpviN3JQm1nCZ7OdLO4kfP5pYVP2W73h3H5K+frPXxJxHunuPwSdhTpyQixI8FOlcNG1GF1NwFNtQwSGuMNkAmZg6d3Fa8PSa2zWGmP9mXBwYd7RBLQ2ZMNtdYbbvReC0uGUyA4tIsTmmQez72s2K27Ob1hHDU9w18d3iqr2p7j1dB9TflJHcBb1+IUAMysY3g0ee9SekVazKY++4DwHaPwjxWNFuaTz+tFrn4w13Sno/j6Dz1bGPFUNl73EkHSQ0FxgSdABorGwoQufN5jr3OK3YJ0PHj8JTRt/qEIWufjHX1i4SCOIKTyhCjScvZ9VIZh6pEjE1Gg6NDKBAE2ElknxK9QoibeGX8NW3Yp//Doz/wDFQ3iLcDE+kwhCmxEvLwJtgf8AReB+aEJDXxtFMbwCRoYBI7iteMZ2XDkT5XXiFes4TkrHUIQsmzc3ZtUe7QwTfyO+QC9q4SuAS8YbLvyMeHRbQl3yQhW9elfaoxUrZju0e75hCEn018T3FIMQe24cz8UIVtKZJukuJa2icwd2uy3KSIcZykwR2Z1G8Wgp/sOkG0mneWg+HD6+SEKk+r6+EmNxJfiXfyANHe6CT8PJN3O6tjBEyF4hbMX/2Q==' 
      },
      { 
        name: 'Women', 
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTngw4mGEhe2s0DZ_h8brOk2H2ot8cuKHkrVA&s' 
      },
      { 
        name: 'Kids', 
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVaEz8YxnjArvbAs5BpLt8XPtVPkR2Jq8W4g&s' 
      }
    ].map((item, idx) => (
      <div key={idx} className="group relative h-[400px] overflow-hidden rounded-[15px] cursor-pointer">
        {/* Image */}
        <img 
          src={item.img} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Gradient Overlay để nổi bật chữ */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
        
        {/* Label */}
        <div className="absolute bottom-8 left-8">
          <h3 className="text-3xl font-serif text-white tracking-wide">{item.name}</h3>
        </div>
        
        {/* Hover Effect: Border nhẹ */}
        <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-all duration-500 rounded-[15px]" />
      </div>
    ))}
  </div>
</section>

     

        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-20 py-16 md:py-24">

          {/* --- 3. CATEGORIES --- */}
          <section>
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">Catalogue</span>
                <h2 className="text-3xl font-serif text-gray-900">Danh Mục Sản Phẩm</h2>
              </div>
              <a href="#" className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-300 hover:border-gray-900 transition-all pb-1">
                Xem Tất Cả
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Optical Frames', vn: 'Gọng Kính Thuốc', img: 'https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=800&auto=format&fit=crop' },
                { name: 'Sunglasses', vn: 'Kính Mát Thời Trang', img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop' },
                { name: 'Accessories', vn: 'Phụ Kiện Kính', img: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=800&auto=format&fit=crop' }
              ].map((cat, idx) => (
                <div key={idx} className="group cursor-pointer">
                  {/* Updated Category Image Radius */}
                  <div className="relative h-[350px] md:h-[450px] w-full overflow-hidden bg-gray-100 mb-4 rounded-[15px]">
                    <img 
                      src={cat.img} 
                      alt={cat.name} 
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                    />
                    <div className="absolute bottom-4 right-4 bg-white text-black p-2 rounded-full shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                       <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-xl font-serif text-gray-900">{cat.name}</h3>
                  <p className="text-sm text-gray-500">{cat.vn}</p>
                </div>
              ))}
            </div>
          </section>

          {/* --- 4. FEATURED PRODUCTS --- */}
          <section>
            <h2 className="text-3xl font-serif text-gray-900 mb-10 text-center">New Arrivals</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
              {[
                { name: 'The Architect', price: '2.400.000₫', img: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=800&auto=format&fit=crop' },
                { name: 'Midnight Sun', price: '3.850.000₫', img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop' },
                { name: 'Oxford Oval', price: '1.950.000₫', img: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?q=80&w=800&auto=format&fit=crop' },
                { name: 'Tokyo Tortoise', price: '2.950.000₫', img: 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?q=80&w=800&auto=format&fit=crop' },
              ].map((product, i) => (
                <div key={i} className="group cursor-pointer">
                  {/* Updated Product Card Radius */}
                  <div className="relative aspect-[4/5] bg-[#F9F9F9] overflow-hidden mb-4 border border-transparent group-hover:border-gray-200 transition-all rounded-[15px]">
                     <img 
                       src={product.img} 
                       alt={product.name} 
                       className="w-full h-full object-cover mix-blend-multiply opacity-95 group-hover:scale-105 transition-all duration-700 ease-in-out" 
                     />
                     <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {/* Updated Cart Button Radius */}
                        <Button className="w-full bg-white/90 backdrop-blur-sm text-black hover:bg-black hover:text-white shadow-sm h-10 rounded-[15px] uppercase text-[10px] font-bold tracking-widest transition-colors">
                           Add to Cart
                        </Button>
                     </div>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-serif text-sm font-medium text-gray-900">{product.name}</h3>
                      <p className="text-gray-400 text-[10px] uppercase tracking-wider mt-0.5">Titanium</p>
                    </div>
                    <span className="font-medium text-gray-900 text-sm">{product.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* --- 5. BOOKING / CTA --- */}
          {/* Updated Section Radius */}
          <section className="relative rounded-[15px] bg-gray-50 border border-gray-100 overflow-hidden px-6 py-12 md:px-16 md:py-14 text-center">
             <div className="relative z-10 max-w-2xl mx-auto space-y-3">
                <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase block">Professional Eye Exam</span>
                <h2 className="text-2xl md:text-3xl font-serif text-gray-900 leading-tight">
                   Đặt lịch kiểm tra thị lực <br/> <span className="text-gray-400 italic">chuẩn quốc tế.</span>
                </h2>
                <p className="text-gray-500 text-sm font-light leading-relaxed max-w-lg mx-auto">
                   Trải nghiệm quy trình đo mắt 12 bước với trang thiết bị tối tân. Tư vấn phong cách bởi stylist chuyên nghiệp.
                </p>
                <div className="pt-3">
                   {/* Updated Booking Button Radius */}
                   <Button className="h-11 px-8 bg-gray-900 text-white hover:bg-black rounded-[15px] text-[10px] font-bold tracking-widest uppercase shadow-md transition-all">
                      Đặt Lịch Ngay
                   </Button>
                </div>
             </div>
             
             <div className="absolute top-[-50%] left-[-20%] w-[400px] h-[400px] bg-gray-200/40 rounded-full blur-[80px] pointer-events-none"></div>
             <div className="absolute bottom-[-50%] right-[-20%] w-[400px] h-[400px] bg-gray-200/40 rounded-full blur-[80px] pointer-events-none"></div>
          </section>

        </div>
      </main>
    </div>
  );
};