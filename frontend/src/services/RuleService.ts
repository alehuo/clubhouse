import { ApiResponse } from "@alehuo/clubhouse-shared";
import axios from "axios";

const getRules = async () => {
  const res = await axios.get<ApiResponse<Rule[]>>("api/v1/rules");
  return res.data;
};

export interface Rule {
  ruleId: number;
  order: number;
  text: string;
}

const ruleList: Rule[] = [
  {
    ruleId: 1,
    order: 3,
    text:
      "Every person who visits the clubhouse for the first time must go through a detailed walkthrough" +
      " of these rules to make sure that he/she understands the basic measurements that are made to ensure the" +
      " safety of others and him/herself.",
  },
  {
    ruleId: 2,
    order: 2,
    text:
      "Quis et in sunt consequat duis et. Cillum ipsum" +
      " ad consequat et in eu ipsum adipisicing. Adipisicing aute dolore " +
      "velit adipisicing deserunt deserunt magna deserunt non magna incididunt." +
      " Qui Lorem irure commodo sint aute non. Deserunt esse sunt sit laboris " +
      "ipsum aute. Tempor minim labore et aliquip exercitation et consectetur." +
      " Pariatur voluptate laborum reprehenderit et eiusmod non quis minim anim exercitation eu sit cillum.",
  },
  {
    ruleId: 3,
    order: 1,
    text:
      "Excepteur irure quis magna cillum ex. Minim" +
      " commodo esse ut et nulla esse culpa duis velit pariatur sint consequat." +
      " Irure mollit amet sit dolore adipisicing elit aliquip veniam fugiat. " +
      "Dolor quis cillum ad sit dolor eiusmod esse aliqua aliquip aliqua magna Lorem. " +
      "Proident voluptate laboris eu commodo nulla amet veniam.",
  },
  {
    ruleId: 4,
    order: 4,
    text:
      "Et non fugiat excepteur excepteur eu sint enim " +
      "reprehenderit eiusmod laboris in minim est consequat. Irure excepteur " +
      "voluptate dolor anim. Minim et non nulla et ad " +
      "id cillum. Consequat do non do sint esse tempor et proident consectetur.",
  },
  {
    ruleId: 5,
    order: 5,
    text:
      "Qui ex occaecat exercitation dolore adipisicing " +
      "commodo ullamco aliquip excepteur culpa mollit velit consectetur dolor. " +
      "Dolor magna consequat ipsum eu consectetur aliqua mollit. " +
      "Exercitation incididunt est exercitation et est adipisicing anim et enim eu nisi consectetur " +
      "do incididunt. Ipsum reprehenderit consequat " +
      "ullamco incididunt minim labore ea nostrud sit commodo nisi " +
      "aute occaecat. In est elit duis eu minim ea occaecat veniam dolore " +
      "commodo qui proident labore dolore. Et do et consectetur eu ea voluptate" +
      " deserunt.Veniam enim nulla irure voluptate aliqua irure esse deserunt" +
      " minim esse cupidatat. Proident ipsum consequat excepteur " +
      "ipsum exercitation dolor pariatur culpa anim minim labore ullamco." +
      " Excepteur sint laborum esse ullamco elit veniam consectetur consectetur do deserunt ullamco esse magna.",
  },
];

const getRulesMock = () => {
  const response: ApiResponse<Rule[]> = {
    payload: ruleList,
    success: true,
  };
  return Promise.resolve(response);
};

export default { getRules, getRulesMock };
