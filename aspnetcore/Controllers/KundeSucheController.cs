using System.Collections.Generic;
using aspnetcore.Model;
using Microsoft.AspNetCore.Mvc;

namespace aspnetcore.Controllers {
    [Route("api/[controller]")]
    public class KundeController : Controller {
        // GET api/kunde
        [HttpGet("queryfelder")]
        public IEnumerable<QueryFeld> GetQueryFelder() {
            yield return new StringQueryFeld("name", "Name");
            yield return new StringQueryFeld("vorname", "Vorname");
            yield return new DatumQueryFeld("geburtsdatum", "Geburtsdatum");
        }

        // GET api/kundesuche/5
        [HttpGet("{id}")]
        public string Get(int id) {
            return "value";
        }

        // POST api/kundesuche
        [HttpPost]
        public void Post([FromBody]string value) {
        }

        // PUT api/kundesuche/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value) {
        }

        // DELETE api/kundesuche/5
        [HttpDelete("{id}")]
        public void Delete(int id) {
        }
    }
}
