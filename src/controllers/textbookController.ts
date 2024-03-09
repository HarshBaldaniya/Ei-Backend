import { Request, Response } from "express";

export class textbook {
    static textbookHome = async (req: Request, res: Response): Promise<void> => {
        try {
            console.log('Reached the textbook mapping page');
            res.send('Welcome to the textbook mapping page!');
        } catch (error: any) {
            console.error('Error fetching homePage:', error);
            res.status(500).json({ error: 'Error fetching homePage. Please try again later.' });
        }
    }
}