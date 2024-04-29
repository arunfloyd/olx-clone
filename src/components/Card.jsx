import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

const BasicExample = (data) => {
  const navigate = useNavigate();
  const handleMoreDetails = (id) => {
    return navigate(`/detail/${id}`);
  };

  return (
    <Card className="m-2 w-1/6 rounded-lg border border-dark text-center">
      <Card.Img variant="top" src={data?.data?.url} />
      <Card.Body>
        <Card.Text>
          <strong>{data?.data?.price}</strong>
        </Card.Text>
        <Card.Title style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          {data?.data?.title}
        </Card.Title>
        <Button
          className="mt-1 bg-black text-white text-bold rounded-lg p-2"
          onClick={() => handleMoreDetails(data?.data?.id)}
        >
          More Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BasicExample;
