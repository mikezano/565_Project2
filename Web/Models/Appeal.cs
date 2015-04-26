using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Xml;
using System.IO;

namespace Web.Models
{
    public class Appeal
    {
        public int Id { get; set; }
        public Grade Grade { get; set; }
        public string Title { get; set; }
        public string[] Comments { get; set; }
        public string State { get; set; }
        public string ActionUri { get; set; }


        public void Approve()
        {
            this.State = "Approved";
        }
    }

    public class AppealFormatter : BufferedMediaTypeFormatter
    {
        public AppealFormatter()
        {
            SupportedMediaTypes.Add(new MediaTypeHeaderValue("application/vnd.cse564-appeals+xml"));
        }

        public override bool CanReadType(Type type)
        {
            return type == typeof(Appeal) ? true : false;
        }

        public override bool CanWriteType(Type type)
        {
            return type == typeof(Appeal) ? true : false;
        }

        public override void WriteToStream(Type type, object value, Stream writeStream, HttpContent content)
        {
            using (var writer = new StreamWriter(writeStream))
            {
                var appeal = value as Appeal;
                if (appeal != null)
                {
                    WriteItem(appeal, writer);

                }
            }
        }

        private void WriteItem(Appeal appeal, StreamWriter writer)
        {

            XmlDocument xml = new XmlDocument();
            XmlElement root = xml.CreateElement("Appeal");
            xml.AppendChild(root);

            XmlElement id = xml.CreateElement("Id");
            XmlElement grade = xml.CreateElement("Grade");
            XmlElement title = xml.CreateElement("Title");
            XmlElement actionUri = xml.CreateElement("ActionUri");
            XmlElement state = xml.CreateElement("State");

            id.InnerText = appeal.Id.ToString();
            title.InnerText = appeal.Title;
            actionUri.InnerText = appeal.ActionUri;
            state.InnerText = appeal.State;

            //grade object being added
            XmlElement letter = xml.CreateElement("Letter");
            letter.InnerText = appeal.Grade.Letter;
            XmlElement gradeComments = xml.CreateElement("Comments");
            gradeComments.InnerText = appeal.Grade.Comments;
            grade.AppendChild(letter);
            grade.AppendChild(gradeComments);

            //student comments added

            if (appeal.Comments != null)
            {
                foreach (var c_ in appeal.Comments)
                {
                    XmlElement c = xml.CreateElement("Comments");
                    c.InnerText = c_;
                    root.AppendChild(c);
                }

                //XmlElement empty = xml.CreateElement("Comments");
                //empty.InnerText = string.Empty;
                //root.AppendChild(empty);
            }

            root.AppendChild(id);
            root.AppendChild(grade);
            root.AppendChild(title);
            root.AppendChild(actionUri);
            root.AppendChild(state);

            writer.Write(root.OuterXml);
        }
    }
}