namespace aspnetcore.Model {
    public class QueryFeld {
        protected QueryFeld(string kind, string feldKey, string feldName) {
            Kind = kind;
            FeldKey = feldKey;
            FeldName = feldName;
        }
        public string Kind { get; }
        public string FeldKey { get; }
        public string FeldName { get; }
    }

    public class StringQueryFeld : QueryFeld {
        public StringQueryFeld(string feldKey, string feldName) : base("string", feldKey, feldName) {
        }
    }

    public class DatumQueryFeld : QueryFeld {
        public DatumQueryFeld(string feldKey, string feldName) : base("datum", feldKey, feldName) {
        }
    }
}
