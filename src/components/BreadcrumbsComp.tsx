import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
    title: string;
    url: string;
}

interface BreadcrumbsProps {
    breadcrumbs: BreadcrumbItem[];
}

const BreadcrumbsComp: React.FC<BreadcrumbsProps> = ({ breadcrumbs }) => (
    <Breadcrumb>
        {breadcrumbs.map((breadcrumb, index) => (
            <Breadcrumb.Item key={index} >
                {breadcrumb.url == "#" ? breadcrumb.title : <Link to={breadcrumb.url}>{breadcrumb.title}</Link>}
            </Breadcrumb.Item>
        ))}
    </Breadcrumb>
);

export default BreadcrumbsComp;
